import React from 'react';
import {useParams, useRouteMatch} from 'react-router';
import {Link} from "react-router-dom";
import sectionStyles from "./SectionComponentStyles";
import setColor from "../../utils";

export default function SectionComponent() {
  const useStyles = sectionStyles();
  const { sectionId } = useParams();

  const { path, url } = useRouteMatch();
  console.log("path url", path, url, typeof sectionId);

  return (
    <div className={useStyles.sectionContainer}>

      <h1 className={useStyles.sectionTitle} style={{backgroundColor: setColor(sectionId)}}>Раздел {sectionId}</h1>
      <div className={useStyles.sectionContent}>
      {Array(30).fill(1).map((_, pageId) => (
        <Link className={useStyles.sectionLink} key={`k${pageId}`} to={`${url}/${pageId + 1}`}>Страница {`${pageId + 1}`}</Link>
        )
      )}
      </div>
    </div>
)};
