import React from 'react'
// 样式优化 2 将多个样式对象存储在一个对象内
// import styles from './cmtStyle.js';
import styles from '../../css/commentItem.css';

export default function CommentItem(props) {

  // 样式优化 1 将样式用对象记录
  // const boxStyle = {marginBottom:'5px',border:'1px solid #0ff'};
  // return (
  //   < div style = {styles.boxStyle} >
  //     <strong>评论人:{props.user}</strong>
  //     <p>评论内容:{props.content}</p>
  //   </div>
  // );
  return (
    < div className={styles.box}>
      <strong>评论人:{props.user}</strong>
      <p>评论内容:{props.content}</p>
    </div>
  );
}
