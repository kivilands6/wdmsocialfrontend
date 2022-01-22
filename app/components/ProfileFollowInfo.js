import React, { useEffect, useState } from "react"
import Axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import LoadingDotsIcon from './LoadingDotsIcon'

function ProfileFollowInfo(props) {
    const follow = props.action
    const {username} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()

        async function fetchPosts(){
            try{
                    setIsLoading(true)
                    const response = await Axios.get(`/profile/${username}/${follow}`, {cancelToken: ourRequest.token})
                    setPosts(response.data)
                    setIsLoading(false)
            }
            catch(e){
                console.log("There was a problem or the request was canceled.")
            }
        }
        fetchPosts()
        return () => {
            ourRequest.cancel()
        }
    }, [username, follow])

    if(isLoading) return <LoadingDotsIcon />

    if(isLoading == false && posts == "") {
        if(follow == "followers") {
            return (
                <div className="text-center">
                    Seems like nobody is interested in you...
                </div>
            )
        }
        if(follow == "following") {
            return (
                <div className="text-center">
                    You now you can follow someone right?
                </div>
            )
        }
        return
    }

  return (
    <div className="list-group">
        {posts.map((follower, index) => {
            return (
                <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
                    <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
                </Link>
            )
        })}
    </div>
  )
}

export default ProfileFollowInfo