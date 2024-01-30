class DBMS {
  static #table_list = [];
  static CREATE_TABLE(table_name, table_schema) {
    this.#table_list.push(new Table(table_name, table_schema));
  }
  static DELETE_TABLE(table_name) {
    this.#table_list = this.#table_list.filter(
      (table) => table.table_name !== table_name
    );
  }
  static SHOW_TABLES() {
    console.log(this.#table_list);
  }
}

class Table {
  table_name;
  table_schema;
  constructor(table_name, table_schema) {
    this.table_name = table_name;
    this.table_schema = table_schema;
  }
}

DBMS.CREATE_TABLE("table1", { colmn1: "type1", colmn2: "type2" });
DBMS.CREATE_TABLE("table2", { colmn1: "type3", colmn2: "type4" });
DBMS.SHOW_TABLES();

// class DBMS {
//   constructor() {}
//   #table_list = [];
//   //table 생성
//   static CREATE_TABLE(table_name, schema) {
//     new Table(table_name, schema);
//   }
//   static DELETE_TABLE() {}
//   static QUERY(query_string) {}
//   static SHOW_TABLES() {}
// }

// class Table {
//   table_name;
//   table_schema = []; // [{'column_name1':'type1'},{'column_name2':'type2'}, {'column_name3':'type3'}]
//   rows = [];
//   constructor(table_name, schema = {}) {
//     this.table_name = table_name;
//     for (const column_name in schema) {
//       this.table_schema.push({ [column_name]: schema[column_name] });
//     }
//   }
// }

// DBMS.QUERY(
//   "INSERT INTO coinList (name, ticker, price, totalSupply) VALUES ('bitcoin', 'BTC', 46000, 21000000)"
// );

// console.log(coinList.rows);
