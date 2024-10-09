const API_URL = 'http://localhost:5000/api';
let token = localStorage.getItem('token');
let currentUser = null;

// Helper function for making authenticated requests
async function authFetch(url, options = {}) {
    if (!options.headers) options.headers = {};
    options.headers['x-auth-token'] = token;  // Use x-auth-token instead of Authorization
    const response = await fetch(url, options);
    if (response.status === 401) {
        token = null;
        localStorage.removeItem('token');
        showAuthSection();
    }
    return response;
}

// Show authentication section
function showAuthSection() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('user-section').classList.add('hidden');
}

// Fetch the current user
async function fetchCurrentUser() {
    const response = await authFetch(`${API_URL}/auth/user`);
    if (response.ok) {
        currentUser = await response.json();
        document.getElementById('username').innerText = currentUser.username;
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('user-section').classList.remove('hidden');
        fetchFeed();  // Load feed after fetching the current user
    } else {
        showAuthSection();
    }
}

// Authentication
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (response.ok) {
        alert('Registration successful. Please log in.');
    } else {
        alert(`Registration failed: ${data.message}`);
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
        token = data.token;
        localStorage.setItem('token', token);
        fetchCurrentUser();
    } else {
        alert(`Login failed: ${data.message}`);
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    token = null;
    localStorage.removeItem('token');
    showAuthSection();
});

// Create a post
document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    const mediaFile = document.getElementById('post-media').files[0];

    const formData = new FormData();
    formData.append('content', content);
    if (mediaFile) {
        formData.append('media', mediaFile);
    }

    const response = await authFetch(`${API_URL}/posts`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Post created successfully');
        document.getElementById('post-content').value = '';
        document.getElementById('post-media').value = '';
        fetchFeed();
    } else {
        const data = await response.json();
        alert(`Failed to create post: ${data.message}`);
    }
});

async function fetchFeed() {
    const response = await authFetch(`${API_URL}/posts/feed`);
    const posts = await response.json();
    const feedDiv = document.getElementById('feed');
    feedDiv.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        console.log(post);
        postDiv.className = 'post';
        postDiv.innerHTML = `
    <p><strong>${post.username}</strong></p>
    <p>${post.content}</p>
    ${post.media ? `<img src="${post.media}" alt="Post media" style="max-width: 100%;">` : ''}
    <button onclick="likePost('${post._id}')">Like (${post.likes.length})</button>
    <button onclick="showComments('${post._id}')">Comments (${post.comments.length})</button>
    <button onclick="deletePost('${post._id}')">Delete</button>
    <div id="comments-${post._id}" class="hidden"></div>
    <form onsubmit="addComment(event, '${post._id}')">
        <input type="text" placeholder="Add a comment" required>
        <button type="submit">Comment</button>
    </form>
`;
        feedDiv.appendChild(postDiv);
    });
}

// Function to delete a post
async function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                alert("Post deleted successfully.");
                fetchFeed();
            } else {
                console.error("Error deleting post:", response.statusText);
                alert("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Error deleting post. Please try again.");
        }
    }
}

// Like a post
async function likePost(postId) {
    const response = await authFetch(`${API_URL}/likes/post/${postId}`, { method: 'POST' });
    if (response.ok) {
        fetchFeed();
    } else {
        const data = await response.json();
        alert(`Failed to like post: ${data.message}`);
    }
}

// Show comments
async function showComments(postId) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.classList.toggle('hidden');

    if (!commentsDiv.classList.contains('hidden') && commentsDiv.innerHTML === '') {
        const response = await authFetch(`${API_URL}/comments/${postId}`);
        if (response.ok) {
            const comments = await response.json();
            commentsDiv.innerHTML = comments.map(comment => `
                <div class="comment">
                    <p><strong>${comment.user.username}</strong>: ${comment.content}</p>
                    <button onclick="likeComment('${comment._id}')">Like (${comment.likes.length})</button>
                </div>
            `).join('');
        } else {
            const data = await response.json();
            alert(`Failed to load comments: ${data.message}`);
        }
    }
}

//Add a comment
async function addComment(event, postId) {
    event.preventDefault();
    const commentInput = event.target.querySelector('input[type="text"]');
    const content = commentInput.value;

    const response = await authFetch(`${API_URL}/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    if (response.ok) {
        commentInput.value = '';
        fetchFeed();
    } else {
        const data = await response.json();
        alert(`Failed to add comment: ${data.message}`);
    }
}

// Like a comment
async function likeComment(commentId) {
    const response = await authFetch(`${API_URL}/likes/comment/${commentId}`, { method: 'POST' });
    if (response.ok) {
        fetchFeed();
    } else {
        const data = await response.json();
        alert(`Failed to like comment: ${data.message}`);
    }
}

// Search users
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('user-search').value;
    const response = await authFetch(`${API_URL}/users/search?query=${encodeURIComponent(query)}`);

    if (response.ok) {
        const users = await response.json();
        const resultsDiv = document.getElementById('user-results');

        resultsDiv.innerHTML = users.map(user => `
    <div>
        <p>${user.username}</p>
        <button onclick="followUser('${user._id}')">Follow</button>
    </div>
`).join('');
    } else {
        console.error('Error fetching users', response.status);
    }
});

// Follow a user
async function followUser(userId) {
    const response = await authFetch(`${API_URL}/users/follow/${userId}`, { method: 'POST' });
    if (response.ok) {
        alert('User followed successfully');
    } else {
        const data = await response.json();
        alert(`Failed to follow user: ${data.message}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addStoryBtn = document.getElementById("add-story-btn");
    const storiesContainer = document.getElementById("stories-container");
    const API_URL = "/api/stories";

    // Function to add a new story
    addStoryBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const storyContent = document.getElementById("story-content").value;
        const mediaFile = document.getElementById("media-file").files[0];

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to log in to add a story.");
            return;
        }

        if (storyContent && mediaFile) {
            const formData = new FormData();
            formData.append("caption", storyContent);
            formData.append("media", mediaFile);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "x-auth-token": token,
                    },
                    body: formData,
                });

                if (response.ok) {
                    document.getElementById("story-content").value = "";
                    document.getElementById("media-file").value = "";
                    fetchStories();
                } else {
                    const errorResponse = await response.json();
                    console.error("Error adding story:", errorResponse.message);
                    alert(`Error adding story: ${errorResponse.message}`);
                }
            } catch (error) {
                console.error("Error adding story:", error);
                alert("An error occurred while adding the story.");
            }
        } else {
            alert("Please enter a story and select a media file.");
        }
    });

    // Function to fetch and display stories
    async function fetchStories() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching stories: ${response.statusText}`);
            }

            const stories = await response.json();
            displayStories(stories);
        } catch (error) {
            console.error(error.message);
            alert("An error occurred while fetching stories.");
        }
    }

    // Function to display stories
    function displayStories(stories) {
        storiesContainer.innerHTML = "";
        stories.forEach(story => {
            const storyElement = document.createElement("div");
            storyElement.classList.add("story");
            storyElement.innerHTML = `
        <img src="${story.mediaUrl}" alt="Story media" width="500" height="600" />
        <p>${story.caption}</p>
        <small>Posted on: ${new Date(story.createdAt).toLocaleString()}</small>
    `;
            storiesContainer.appendChild(storyElement);
        });
    }

    // Fetch stories on initial load
    // fetchStories();
});

// Initialize the app
if (token) {
    fetchCurrentUser();
} else {
    showAuthSection();
}