import { useState } from "react";

interface ListProps {
  data: Array<string>
  onSelect?:(element:string) => void
}

function List({data, onSelect}:ListProps) {
  const [index, setIndex] = useState(1)
  const handleClick = (i:number, element:string) => 
  {
    setIndex(i);
    onSelect?.(element)
  }
  return (
    <ul className="list-group">
      {data.map((element, i) => (
        <li onClick={()=>handleClick(i, element)} 
            className={`list-group-item ${index == i ? "active" : ""}`}
            key={element}>
          {element}
        </li>
      ))}
    </ul>
  );
}

export default List;
