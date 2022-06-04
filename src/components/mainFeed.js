import axios from "axios";
import {useEffect, useState} from "react";
import './mainFeed.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToTop from "react-scroll-to-top";
import ProfileBanner from "./mainFeed/profileBanner/profileBanner";
import Post from "./mainFeed/post/image";
import ButtonSelector from "./mainFeed/profileBanner/buttonSelector";
function MainFeed(props) {
    let [useHasMore, setHasMore] = useState(true);
    let [usePostData, setPostData] = useState('');
    let [useContentDisplayed, setContentDisplayed] = useState([]);
    let [usePostLimit, setPostLimit] = useState(5);
    let [useCurrentMode, setCurrentMode] = useState("posts");

    const fetchData = async () => {
        await axios.get('https://api.danlee.uk/getContent').then(result => {
            setPostData(result.data);
            setContentDisplayed(result.data.map((p, index) => {
                let image = p.location;
                if (p.location === null) {
                    image = null;
                }
                if (index < usePostLimit) {
                    if (p.image === null) {
                        setPostLimit(usePostLimit ++);
                        return null;
                    } else {
                        return <Post content={
                                p.description
                            }
                            image={image}
                            date={
                                p.date
                            }/>;
                    }
                } else {
                    return null;
                }
            }))
        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    function fetchMoreData() {
        if (usePostLimit >= usePostData.length) {
            setHasMore(false);
            return;
        }
        setPostLimit(usePostLimit + 5);
        handleToUpdate(useCurrentMode)
    };

    const handleToUpdate = (mode) => {
        setCurrentMode(mode);
        if (mode === "posts") {
            setContentDisplayed(usePostData.map((p, index) => {
                let image = p.location;
                if (p.location === null) {
                    image = null;
                }
                if (index < usePostLimit+5) {
                    if (p.image === null) {
                        setPostLimit(usePostLimit ++);
                        return null;
                    } else {
                        return <Post key={p.id} content={
                                p.description
                            }
                            image={image}
                            date={
                                p.date
                            }/>;
                    }
                } else {
                    return null;
                }
            }))
        }
        else if (mode === "media") {
            setContentDisplayed(usePostData.map((p, index) => {
                let image = p.location;
                if (p.location === null) {
                    setPostLimit(usePostLimit++)
                    return null
                }
                if (index < usePostLimit+5) {
                    if (p.image === null) {
                        setPostLimit(usePostLimit ++);
                        return null;
                    } else {
                        return <Post key={p.id} content={
                                p.description
                            }
                            image={image}
                            date={
                                p.date
                            }/>;
                    }
                } else {
                    return null;
                }
            }))
        }
        else if(mode==="archive"){
            setContentDisplayed(<div></div>);
        }
    }

    function themeToggler(){
        props.themeToggler();
    }
    

    return (
        <div><ScrollToTop smooth/>
            <div className="content">
                <ProfileBanner themeToggler={themeToggler} name="Dan Lee" username="@dan-lee76" description="The onlydans exclusive site owner ;)"
                    post_amount={
                        usePostData.length
                    }/>
                <ButtonSelector handleToUpdate={handleToUpdate}/>
                <InfiniteScroll dataLength={usePostLimit}
                    next={fetchMoreData}
                    hasMore={useHasMore}
                    loader={
                        <h4>Loading...</h4>
                    }
//                     endMessage={<p
//                         style={
// {textAlign: "center"}}>
//                     <b>Yay! You have seen it all</b></p>}
>

                    {useContentDisplayed} </InfiniteScroll>
            </div>
        </div>
    )
}

export default MainFeed;