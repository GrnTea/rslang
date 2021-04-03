import React from 'react';
import {useParams, useRouteMatch} from 'react-router';
import {Link} from "react-router-dom";

export default function SectionComponent() {
  const { sectionId } = useParams();

  let { path, url } = useRouteMatch();
  console.log('path url', path, url, typeof sectionId);

  return (
    <>
        <h3>Раздел {sectionId}</h3>
        {Array(30).fill(1).map((_, pageId) => (
          <Link key={`k${pageId}`} to={`${url}${pageId + 1}`}>Страница {`${pageId + 1}`}</Link>
          )
        )}
    </>
)};