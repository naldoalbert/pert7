// import { FormTask } from "./components/FormTask";
// import { TableTask } from "./components/TableTask";

// function App() {
//   return (
//     <section className="container mx-auto py-10 min-w-96">
//       <div className="mx-auto">
//         <h1 className="text-3xl font-bold underline text-center mb-9">
//           Todo App
//         </h1>
//         <FormTask />
//         <TableTask />
//       </div>
//     </section>
//   );
// }

// export default App;


import React from "react";
import { FormOrder } from "./components/FormOrder";
import { TableOrder } from "./components/TableOrder";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Pemesanan</h1>
      <FormOrder />
      <TableOrder />
    </div>
  );
};

export default App;