import React, { useMemo, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faSeedling,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { repoavatar } from "../assets";
import "../assets/css/development.css";
import { HeaderDot } from "../components";
import developmentTimeline from "../constants/developmentTimeline";
import "@fortawesome/fontawesome-free/css/all.min.css";

const getTimelineIcon = (item, index) => {
  if (item.status === "ongoing") return faRocket;
  if (index <= 1) return faSeedling;
  if (index >= 6) return faTrophy;
  return faUsers;
};

const Development = () => {
  const box1Ref = useRef(null);

  const timelineData = useMemo(
    () => [...developmentTimeline].sort((a, b) => a.year - b.year),
    []
  );

  const totalMemberCount = useMemo(
    () =>
      timelineData.reduce(
        (sum, item) => sum + (Number.isFinite(item.memberCount) ? item.memberCount : 0),
        0
      ),
    [timelineData]
  );

  return (
    <div className="min-h-screen">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12 px-0 md:py-4 md:px-8">
          <div className="flex-1">
            <div className="flex flex-row gap-4 md:gap-6 items-center">
              <div className="w-fit" ref={box1Ref}>
                <HeaderDot />
              </div>
              <div className="flex flex-row items-center gap-2 md:gap-3">
                <img src={repoavatar} alt="KingCola-ICG" className="w-8 md:w-10" />
                <h1 className="text-white text-[22px] md:text-[42px] font-semibold md:leading-10 uppercase">
                  团队发展
                </h1>
              </div>
            </div>
            <p className="development-intro mt-4 md:ml-16 text-gray-300 text-[14px] md:text-[17px] leading-[1.8]">
              自 2017 年创立以来，KingCola-ICG 持续深耕学科竞赛、项目实践与科研创新，
              形成了以传承带动成长、以实战驱动能力提升的团队发展路径。
            </p>
          </div>

          <div className="development-summary-card">
            <div className="development-summary-value">{timelineData.length} 届</div>
            <div className="development-summary-label">发展历程</div>
            <div className="development-summary-meta">
              累计记录成员规模约 {totalMemberCount}+ 人次
            </div>
          </div>
        </div>

        <VerticalTimeline lineColor="#2B86AE">
          {timelineData.map((item, index) => {
            const isOngoing = item.status === "ongoing";
            const position = index % 2 === 0 ? "left" : "right";

            return (
              <VerticalTimelineElement
                key={item.year}
                className={
                  isOngoing
                    ? "vertical-timeline-element--ongoing"
                    : index % 2 === 0
                      ? "vertical-timeline-element--work"
                      : "vertical-timeline-element--education"
                }
                position={position}
                contentStyle={{
                  background: isOngoing
                    ? "linear-gradient(120deg, #122238 0%, #162b45 100%)"
                    : index % 2 === 0
                      ? "linear-gradient(120deg, #161616 0%, #141C24 100%)"
                      : "linear-gradient(120deg, #141C24 0%, #161616 100%)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: isOngoing
                    ? "20px solid #4bb0ff"
                    : "20px solid #2B86AE",
                }}
                date={`${item.year} · ${item.term}`}
                iconStyle={{
                  background: isOngoing ? "#17304a" : "#141C24",
                  color: "#fff",
                }}
                icon={<FontAwesomeIcon icon={getTimelineIcon(item, index)} />}
              >
                <h2 className="vertical-timeline-element-title">{item.term}</h2>
                <p className="development-meta">
                  <span>负责人：</span>
                  {item.leaders.join("、")}
                </p>
                <p className="development-meta">
                  <span>主要成员：</span>
                  {item.members}
                </p>
                <div className="development-achievement-title">主要成就</div>
                <ul className="development-achievement-list">
                  {item.achievements.map((achievement) => (
                    <li key={`${item.year}-${achievement}`}>{achievement}</li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Development;
