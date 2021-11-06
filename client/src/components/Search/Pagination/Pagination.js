import React, { useEffect } from "react";
import "./pagination.css";

export function Pagination(props) {
  const {
    count,
    getPokemonTypes,
    getPokemons,
    pagination,
    setPagination,
    select,
    checkbox,
  } = props;

  useEffect(() => {
    if (count) {
      const pages = Math.ceil(count / 20);
      setPagination((pagination) => ({ ...pagination, pages }));
    }
  }, [count, setPagination]);

  function funcPagination(num) {
    if (num < 0 || num > pagination.pages - 1) return false;
    if (pagination.filterState === 1 && checkbox[0]) {
      getPokemonTypes(checkbox, num * 20, select);
      console.log("Entre a types");
    } else if (pagination.filterState === 0) {
      console.log("entre al else");
      getPokemons(num * 20);
    }
    setPagination({ ...pagination, page: num });
  }
  return (
    <div id="pagination">
      <button className="pagination-btn" onClick={() => funcPagination(0)}>
        First
      </button>
      <button
        className="pagination-btn"
        onClick={() => funcPagination(pagination.page - 1)}
      >
        Prev
      </button>
      <button
        className="pagination-btn"
        onClick={() => funcPagination(pagination.page + 1)}
      >
        Next
      </button>
      <button
        className="pagination-btn"
        onClick={() => funcPagination(pagination.pages - 1)}
      >
        Last
      </button>
    </div>
  );
}
