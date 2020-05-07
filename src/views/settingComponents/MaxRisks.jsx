// import React from "react";
// import styled from "styled-components";
// import { connect } from "react-redux";

// function MaxRisks(props) {
//   const type = props.type.toLowerCase();
//   const currentMax = props.projectRisks.options[type].maxRisks;
//   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//   function onChange(event) {
//     console.log(type);
//     console.log(event.target.value);
//     const allrisks = props.projectRisks[type];
//     const newRisks = allrisks.slice(0, event.target.value);
//     console.log(newRisks);
//     // set the reduced values in state
//     // add disable feature to add row
//   }

  


//   return (
//     <Container>
//       <label>{props.type}</label>
//       <div className="width">
//         <select type="number" onChange={onChange} name={type} defaultValue={currentMax}>
//           {numbers.map((number, index) => {
//             return (
//               <option key={index} value={number}>
//                 {number}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     </Container>
//   );
// }

// export default connect((state) => state, {})(MaxRisks);

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 5px 0;
//   width: 100%;
//   input,
//   select {
//     width: 90px;
//     /* max-width: 100px; */
//     font-size: 14px;
//     border: 1px solid lightgrey;
//   }
// `;
