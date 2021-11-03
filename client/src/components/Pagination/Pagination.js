import React, { useEffect } from "react";

export function Pagination({ getPokemons, count }) {
  const limit = 20;
  let totalPages = Math.ceil(count / limit);
  let numberPages = 0;
  if (totalPages > 5) numberPages = 5;
  else numberPages = totalPages;
  const [pagination, setPagination] = React.useState({
    page: 0,
    pages: [],
  });

  function thePagination(num, button) {
    if (num >= totalPages) return false;
    if (button === "prev" && pagination.page <= 0) return false;

    const count = num * limit;
    let newArr = pagination.pages;
    if (button === "prev" && newArr.length < numberPages) {
      newArr.unshift(num + 1);
    } else if (button === "first" && newArr.length < numberPages) {
      let tempArr = [];
      for (let i = 0; i < numberPages; i++) {
        tempArr.push(i + 1);
      }
      newArr = tempArr;
    } else {
      newArr = pagination.pages.map((item) => num - pagination.page + item);
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] > totalPages) {
          newArr = newArr.slice(0, i);
          break;
        }
      }
    }
    getPokemons(count);
    setPagination({ ...pagination, page: num, pages: newArr });
  }

  useEffect(() => {
    let newArr = [];
    for (let i = 0; i < numberPages; i++) {
      newArr.push(i + 1);
    }
    setPagination((state) => ({ ...state, pages: newArr }));
  }, [numberPages]);

  return (
    <div>
      <button onClick={() => thePagination(0, "first")}>First</button>
      <button onClick={() => thePagination(pagination.page - 1, "prev")}>
        Prev
      </button>
      <ul>
        {pagination.pages.map((page) => (
          <li key={page} onClick={() => thePagination(page - 1, "number")}>
            {page}
          </li>
        ))}
      </ul>
      <button onClick={() => thePagination(pagination.page + 1, "next")}>
        Next
      </button>
      <button onClick={() => thePagination(totalPages - 1, "last")}>
        Last
      </button>
    </div>
  );
}
