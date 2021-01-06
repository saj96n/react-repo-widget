import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  licenseSVG,
  githubSVG,
  watchSVG,
  starSVG,
  forkSVG,
  updateSVG,
} from "./svglib.js";
import { githubColors } from "./colors.js";
import "./githubcard.css";

function solveCount(count) {
  let countNumber = parseInt(count);

  if (countNumber > 1000000) {
    countNumber = Math.round(countNumber / 1000000) + "M";
  } else if (countNumber > 1000) {
    countNumber = Math.round(countNumber / 1000) + "K";
  }

  return countNumber;
}

function RepoCard({
  repo = {},
  center = false,
  squareAvatar = false,
  descriptionLine = 2,
  showLanguage = true,
  showLicense = true,
}) {
//   const [test, setTest] = useState(null);
  const avatar_url = repo.owner.avatarUrl;
  const description = repo.description;
  const forks_count = repo.forks.totalCount;
  const language = repo.primaryLanguage?.name;
  const license =
    repo.licenseInfo === null ? undefined : repo.licenseInfo.spdxId;
  const repoName = repo.name;
  const stars_count = solveCount(repo.stargazerCount);
  const pushed_at = repo.pushedAt.slice(2, 10);
  const watchers_count = solveCount(repo.watchers?.totalCount);
  const username = repo.owner.login;

  const renderCardHeader = useCallback(() => {
    let userLink = "https://github.com/" + username;
    let repoLink = "https://github.com/" + username + "/" + repoName;
    let renderLanguage =
      showLanguage && language !== undefined && language !== null;
    let languageSpan = renderLanguage ? (
      <span key="1" className="githubCardHeaderStatus">
        <span
          style={{
            backgroundColor: githubColors[language],
          }}
        />
        <strong>{language}</strong>
      </span>
    ) : undefined;
    let renderLicense =
      showLicense && license !== undefined && license !== "NOASSERTION";
    let licenseSpan = renderLicense ? (
      <span key="2" className="githubCardHeaderStatus">
        {licenseSVG}
        <strong>{license}</strong>
      </span>
    ) : undefined;
    let secondLine =
      (renderLanguage && renderLicense && repoName.length > 15) ||
      ((renderLanguage || renderLicense) && repoName.length > 20) ? (
        <p
          className="githubCardP"
          style={{
            marginTop: "-7px",
            transform: "translateX(-3px)",
          }}
        >
          {languageSpan}
          {licenseSpan}
        </p>
      ) : undefined;
    let firstLineChildren = [
      <a className="githubCardRepoName" key="0" href={repoLink} target="_blank">
        <strong>{repoName}</strong>
      </a>,
    ];

    if (secondLine === undefined) {
      firstLineChildren.push(languageSpan);
      firstLineChildren.push(licenseSpan);
    }

    return (
      <div className="githubCardHeader">
        <a
          className="githubCardAvatar"
          style={{
            marginTop: secondLine ? "7px" : "",
          }}
          href={userLink}
          target="_blank"
        >
          <img
            src={avatar_url}
            style={{
              borderRadius: squareAvatar ? "5px" : "50%",
            }}
          />
        </a>
        <a className="githubCardBottonStar" href={repoLink} target="_blank">
          Star {githubSVG}
        </a>
        <p className="githubCardP">{firstLineChildren}</p>
        {secondLine}
        <p className="githubCardP">
          Created by&nbsp;
          <a className="githubCardCreator" href={userLink} target="_blank">
            {username}
          </a>
        </p>
      </div>
    );
  }, [username, repoName, avatar_url, license, language]);
  const renderCardContent = useCallback(() => {
    return (
      <div className="githubCardContent">
        <p
          className="githubCardContentP"
          style={{
            WebkitLineClamp: descriptionLine,
          }}
        >
          {description}
        </p>
      </div>
    );
  }, [description]);
  const renderCardFooter = useCallback(() => {
    return (
      <div className="githubCardFooter">
        <span className="githubCardFooterStatus">
          {watchSVG} Watch <strong>{watchers_count}</strong>
        </span>
        <span className="githubCardFooterStatus">
          {starSVG} Stars <strong>{stars_count}</strong>
        </span>
        <span className="githubCardFooterStatus">
          {forkSVG} Forks <strong>{forks_count}</strong>
        </span>
        <span className="githubCardFooterUpdate">
          {updateSVG} {pushed_at}
        </span>
      </div>
    );
  }, [watchers_count, stars_count, pushed_at, forks_count]);

  return (
    <div
      className="githubCard"
      style={{
        margin: center ? "0 auto" : "",
      }}
    >
      {renderCardHeader()}
      {renderCardContent()}
      {renderCardFooter()}
    </div>
  );
}

RepoCard.propTypes = {
  repo: PropTypes.object.isRequired,
  center: PropTypes.bool,
  squareAvatar: PropTypes.bool,
  descriptionLine: PropTypes.number,
  showLanguage: PropTypes.bool,
  showLicense: PropTypes.bool,
};

export { RepoCard };