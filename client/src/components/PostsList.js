import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import NewPost from './NewPost';
import { API_ROOT } from '../constants';

const ChatBox = styled.div`
border: solid black 1px;
height: 81vh;
display: flex;
justify-content: space-between;
flex-direction: column;
background-color: black;
color: white;
font-size: 14px;`

class PostsList extends Component {
    state = {
        posts: []

    }

    componentDidMount() {
        this.getPosts()
        this.interval = setInterval(() => this.getPosts(), 1000);
    }

    getPosts = async () => {
        try {
            const response = await axios.get(`/chat_rooms/1/posts`)
            this.setState({
                posts: response.data,
            })
        } catch (error) {
            console.log(error)
        }
    }

    // deletePost = async (postId) => {
    //     try {
    //         await axios.delete(`/posts/${postId}`)
    //         const posts = await this.getPosts()
    //         this.setState({ posts })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    render() {
        console.log("RENDERING POSTS", this.state.posts)
        const userPosts = this.state.posts.map((post, i) => {
            return (
                <div key={i}>
                    <div>{post.user_id}: {post.content}</div>
                </div>
            )
        })
        return (
            <div>
                <ChatBox >
                    <div>
                        {userPosts}
                    </div>
                    <div>
                        <NewPost
                            getPosts={this.getPosts}
                            chat_room={this.props.chat_room.id}
                            chatRoomId={this.props.activeChatRoom} />
                    </div>
                </ChatBox>
            </div>
        )
    }
}

export default PostsList