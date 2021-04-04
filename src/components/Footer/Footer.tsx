import React from "react";
import GithubLogo from "../../assets/icons/github.svg";
import RSSLogo from "../../assets/icons/rsschool.svg";
import "./FooterStyles.scss";

const githubData = ["ArseniyXaoc", "JuliaGvozdeva", "conservativ007", "Beljar", "GrnTea"];

const Footer = () => {
  const getGithubLinks = () => githubData.map((github) => (
        <a className="footer_link" key={github} href={`https://github.com/${github}`}>{github}</a>
  ));

  return (
    <footer className="footer">
      <div className="footer_container">
        <span> 2021 ©</span>
        <img src={GithubLogo} className="footer_icon footer_github" alt="github"/>
        {getGithubLinks()}

      </div>
      <a className="footer_link" href="https://rs.school/js/">
        <img src={RSSLogo} className="footer_icon footer_rss" alt="rs-school"/>
      </a>
    </footer>
  );
};

export default Footer;
