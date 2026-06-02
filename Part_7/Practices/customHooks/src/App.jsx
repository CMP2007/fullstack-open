// import useCounter from "./customHook"
// const App = () => {
//   const counter = useCounter()

//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>
//         plus
//       </button>
//       <button onClick={counter.decrease}>
//         minus
//       </button>      
//       <button onClick={counter.zero}>
//         zero
//       </button>
//     </div>
//   )
// }


// import useCounter from "./customHook"
// const App = () => {
//   const left = useCounter()
//   const right = useCounter()

//   return (
//     <div>
//       {left.value}
//       <button onClick={left.increase}>
//         left
//       </button>
//       <button onClick={right.increase}>
//         right
//       </button>
//       {right.value}
//     </div>
//   )
// }


import useField from "./customHookExample2"
const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('height')

  return (
    <div>
      <form>
        name: 
        <input {...name}/> 
        <br/> 
        birthdate:
        <input {...born}/>
        <br /> 
        height:
        <input {...height}/>
      </form>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}

export default App