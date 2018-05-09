import React from "react";

export default function RewardsList(props) {
  const pageNum = props.pageNum;
  const maxPage = props.maxPage;

  function onTabClick(event) {
    props.onTabClick(event);
  }

  const paginationArrayer = () => {
    let pageArray = [];

    const left = pageNum - 2;
    const right = pageNum + 2;

    for (let i = 1; i <= maxPage; i++) {
      if (i === 1 || i === maxPage || (i >= left && i <= right))
        pageArray.push(i);
    }

    if (!!pageArray[0] && !!pageArray[1]) {
      if (pageArray[0] + 1 !== pageArray[1]) {
        pageArray.splice(1, 0, "...");
      }
      if (
        pageArray.slice().reverse()[0] - 1 !==
        pageArray.slice().reverse()[1]
      ) {
        pageArray.reverse().splice(1, 0, "...");
        pageArray.reverse();
      }
    }

    return pageArray;
  };

  const pageMap = paginationArrayer().map(val => {
    return (
      <li
        className={{
          active: val === pageNum
        }}
      >
        <a onClick={val === "..." ? null : onTabClick}>{val}</a>
      </li>
    );
  });

  return pageMap;
}
