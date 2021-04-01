import React from "react";
import { useParams } from "react-router-dom";

export default function Sprint() {
  const params = useParams();
  console.log(params);
  return (
    <div>sprint</div>
  );
}
