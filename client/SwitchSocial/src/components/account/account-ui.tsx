import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  useGetBalance,
  useGetTokenAccountBalance,
  useGetTokenAccounts,
  useRequestAirdrop,
  useTransferSol,
} from "./account-data-access";
import { View, StyleSheet, ScrollView, Text, Button, ActivityIndicator,  TextInput } from "react-native";
import { useState, useMemo } from "react";
import { ellipsify } from "../../utils/ellipsify";
import { AppModal } from "../ui/app-modal";

function lamportsToSol(balance: number) {
  return Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000;
}

export function AccountBalance({ address }: { address: PublicKey }) {
  const query = useGetBalance({ address });
  return (
    <View style={styles.accountBalance}>
      <Text style={styles.title}>Current Balance</Text>
      <Text style={styles.balance}>
        {query.data ? lamportsToSol(query.data) : "..."} SOL
      </Text>
    </View>
  );
}

export function AccountButtonGroup({ address }: { address: PublicKey }) {
  const requestAirdrop = useRequestAirdrop({ address });
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  return (
    <View style={styles.accountButtonGroup}>
      <AirdropRequestModal
        hide={() => setShowAirdropModal(false)}
        show={showAirdropModal}
        address={address}
      />
      <TransferSolModal
        hide={() => setShowSendModal(false)}
        show={showSendModal}
        address={address}
      />
      <ReceiveSolModal
        hide={() => setShowReceiveModal(false)}
        show={showReceiveModal}
        address={address}
      />
      <Button
        title="Airdrop"
        disabled={requestAirdrop.isPending}
        onPress={() => {
          setShowAirdropModal(true);
        }}
      />
      <Button
        title="Send"
        onPress={() => setShowSendModal(true)}
        style={styles.buttonMargin}
      />
      <Button
        title="Receive"
        onPress={() => setShowReceiveModal(true)}
        style={styles.buttonMargin}
      />
    </View>
  );
}

export function AirdropRequestModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  const requestAirdrop = useRequestAirdrop({ address });

  return (
    <AppModal
      title="Request Airdrop"
      hide={hide}
      show={show}
      submit={() => {
        requestAirdrop.mutateAsync(1).catch((err) => console.log(err));
      }}
      submitLabel="Request"
      submitDisabled={requestAirdrop.isPending}
    >
      <View style={styles.modalContent}>
        <Text>Request an airdrop of 1 SOL to your connected wallet account.</Text>
      </View>
    </AppModal>
  );
}

export function TransferSolModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  const transferSol = useTransferSol({ address });
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState("");
  
  return (
    <AppModal
      title="Send SOL"
      hide={hide}
      show={show}
      submit={() => {
        transferSol
          .mutateAsync({
            destination: new PublicKey(destinationAddress),
            amount: parseFloat(amount),
          })
          .then(() => hide());
      }}
      submitLabel="Send"
      submitDisabled={!destinationAddress || !amount}
    >
      <View style={styles.modalContent}>
        <TextInput
          label="Amount (SOL)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Destination Address"
          value={destinationAddress}
          onChangeText={setDestinationAddress}
          style={styles.input}
        />
      </View>
    </AppModal>
  );
}

export function ReceiveSolModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  return (
    <AppModal title="Receive assets" hide={hide} show={show}>
      <View style={styles.modalContent}>
        <Text selectable>
          You can receive assets by sending them to your public key:{"\n\n"}
          <Text>{address.toBase58()}</Text>
        </Text>
      </View>
    </AppModal>
  );
}

export function AccountTokens({ address }: { address: PublicKey }) {
  let query = useGetTokenAccounts({ address });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const items = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return query.data?.slice(start, end) ?? [];
  }, [query.data, currentPage, itemsPerPage]);

  const numberOfPages = useMemo(() => {
    return Math.ceil((query.data?.length ?? 0) / itemsPerPage);
  }, [query.data, itemsPerPage]);

  return (
    <>
      <Text style={styles.title}>Token Accounts</Text>
      <ScrollView>
        {query.isLoading && <ActivityIndicator animating={true} />}
        {query.isError && (
          <Text style={styles.error}>
            Error: {query.error?.message.toString()}
          </Text>
        )}
        {query.isSuccess && (
          <>
            {query.data.length === 0 && (
              <View style={styles.noTokens}>
                <Text>No token accounts found.</Text>
              </View>
            )}

            {items?.map(({ account, pubkey }) => (
              <View key={pubkey.toString()} style={styles.tokenRow}>
                <Text>{ellipsify(pubkey.toString())}</Text>
                <Text>{ellipsify(account.data.parsed.info.mint)}</Text>
                <AccountTokenBalance address={pubkey} />
              </View>
            ))}

            {query.data.length > itemsPerPage && (
              <View style={styles.pagination}>
                <Text>{`${currentPage + 1} of ${numberOfPages}`}</Text>
                {/* Pagination control logic can be added here */}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}

export function AccountTokenBalance({ address }: { address: PublicKey }) {
  const query = useGetTokenAccountBalance({ address });
  return query.isLoading ? (
    <ActivityIndicator animating={true} />
  ) : query.data ? (
    <Text>{query.data?.value.uiAmount}</Text>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  accountBalance: {
    marginTop: 12,
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8, // Adjust margin as needed
    color: "black", // You can change color if needed
  },
  accountButtonGroup: {
    paddingVertical: 4,
    flexDirection: "row",
  },
  buttonMargin: {
    marginLeft: 6,
  },
  modalContent: {
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  error: {
    color: "red",
    padding: 8,
  },
  noTokens: {
    marginTop: 12,
  },
  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  pagination: {
    marginVertical: 20,
    alignItems: "center",
  },
});
