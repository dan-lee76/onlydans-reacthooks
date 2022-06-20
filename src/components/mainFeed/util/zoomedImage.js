import {useState } from 'react';
import Download from './download';
import styles from './image.module.css';
function ZoomedImage(props){
    let [useCurrentIndex, setCurrentIndex] = useState(props.postData.findIndex(function(item, i){
        return parseInt(item.id) === props.id
      }))
    let [useImageData, setImageData] = useState(props.postData[useCurrentIndex])

    function nextImage(){
        let newIndex = useCurrentIndex
        if(newIndex !== props.postData.length-1){
            do{
                newIndex++
                setCurrentIndex(newIndex)
                setImageData(props.postData[newIndex])
            }while(props.postData[newIndex].location == null && parseInt(props.postData[newIndex].id) !== props.postData.length-1)
        }
        console.log(props.postData[newIndex].location)
    }

    function previousImage(){
        let newIndex = useCurrentIndex
        if(newIndex !== 0){
            do{
                newIndex--
                setCurrentIndex(newIndex)
                setImageData(props.postData[newIndex])
            }while(props.postData[newIndex].location == null && parseInt(props.postData[newIndex].id) !== 0)
        }
        console.log(props.postData[newIndex].location)
    }

    
    return (
        <div className={styles.imageZoomedBG}>
            <span className={styles.date}>{useImageData.date}<Download location={useImageData.location}/></span>
            <span onClick={props.makeImgBig} className={styles.close}>&times;</span>
            <img className={styles.imageZoomed} src={"https://cdn.danlee.uk/content/posts/"+useImageData.location} alt={useImageData.location}/>
            <span onClick={nextImage} className={styles.nextImage}>&gt;</span>
            <span onClick={previousImage} className={styles.previousImage}>&lt;</span>
            <span className={styles.content}>{useImageData.description}</span>
        </div>
       );
}

export default ZoomedImage;