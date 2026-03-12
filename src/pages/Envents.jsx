import React from "react";
import { AdvancedCarousel } from "../components";
import eventimage  from "../assets/images/eventimage.png";
import "../assets/css/events.css";
import MyCarousel from "../components/Carousel";
import { sharearrow } from "../assets";

function Envents() {
  const stats = [
    {
      value: "50+",
      title: "国家级奖项",
      description: "团队累计斩获近 50 项国家级荣誉，持续在高水平竞赛中突破。",
    },
    {
      value: "100+",
      title: "省级奖项",
      description: "省级奖项累计 100 余项，覆盖程序设计、物联网与创新创业等方向。",
    },
    {
      value: "15+",
      title: "软件著作权",
      description: "已取得 15 项软件著作权，持续推进实验室项目研发与成果落地。",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="z-5">
        <MyCarousel />
      </div>
      <div className="TopStat animate__animated animate__fadeInDown animate__delay-1s mt-[-4rem] md:mt-[-6rem] flex flex-col md:flex-row items-stretch mx-0 md:mx-2 gap-5 md:gap-8 sm:justify-center px-2 md:px-0">
        {stats.map((item) => (
          <div
            key={item.title}
            className="w-[92%] py-3 md:w-[31%] z-40 border-b-[0.25rem] border-b-[#28A9E2] bg-gradient-to-l from-neutral-900 to-gray-900 rounded mx-auto"
          >
            <div className="flex flex-row items-center md:mx-3 mx-2 md:my-4 my-2 gap-4 md:gap-6">
              <div className="align-middle my-auto items-center shrink-0">
                <div className="h-[74px] w-[74px] md:h-[84px] md:w-[84px] bg-slate-800/85 rounded-full text-center border border-sky-500 shadow-[0_0_20px_rgba(40,169,226,0.26)] flex items-center justify-center text-white text-[1.18rem] md:text-[1.55rem] font-semibold">
                  {item.value}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm md:text-[22px] font-semibold leading-tight">
                  {item.title}
                </div>
                <div className="text-gray-400 text-[0.93rem] md:text-lg font-normal leading-[1.55] mt-1">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:px-12 px-2">
        <div className="md:mt-24 mt-8 flex justify-between items-end px-3 md:px-0">
          <div className="animate__animated animate__fadeInLeft animate__delay-1s">
            <div className="text-white md:text-[44px] text-[1.8rem] font-bold leading-tight">
              近期活动
            </div>
            <div className="mt-2 h-[3px] w-20 md:w-28 rounded-full bg-gradient-to-r from-[#8ed8ff] to-[#2ca6e3] shadow-[0_0_10px_rgba(142,216,255,0.5)]" />
          </div>

        </div>
        <div className="md:mx-8 md:mt-16 mt-8 ">
          <div className="md:flex flex-row md:gap-20">
            <div className="md:w-[590px] animate__animated animate__fadeInLeft animate__delay-2s mx-auto w-[280px]">
              <img className="md:h-[590px] h-auto block mx-auto" src={eventimage} alt="Kingcola-ICG 招新海报" draggable={false} onDragStart={(e) => e.preventDefault()} />
              <div className="flex md:w-[476px] w-[280px] gap-5 align-middle content-center px-2 md:px-4 py-3 bg-gradient-to-l from-neutral-900 to-gray-900 rounded">
                <div>
                  <div className="text-center py-2 text-cyan-400 text-xl md:text-[25px] font-bold">
                    招新
                  </div>
                  <div className="text-white text-center text-xl md:text-[50px] font-bold">
                    25
                  </div>
                </div>
                <div className="animate__animated animate__fadeInRight animate__delay-2s">
                  <div className="text-white text-xl md:text-[25px] font-bold">
                    KingCola-ICG 工作室招新
                  </div>
                  <div className="text-gray-400 text-[0.75rem] md:text-lg font-normal">
                    面向全体 25 级同学，欢迎加入开放式创新创业团队，一起学习、协作、成长。
                  </div>
                </div>
              </div>
            </div>
            <div className="md:mx-16 md:mt-0 md:self-start align-middle items-center mx-4">
              <div className="text-[#8ed8ff] text-sm md:text-base font-semibold tracking-[0.08em]">
                招新对象：全体 25 级学生
              </div>
              <div className="text-white text-[25px] mt-2 md:mt-1 md:text-[46px] font-bold leading-tight">
                KingCola-ICG 工作室招新
              </div>
              <div className="text-gray-300 text-[15px] md:text-[19px] font-normal leading-[1.85] mt-3">
                KingCola-ICG 工作室成立于 2017 年 6 月，是一个开放式创新创业团队。团队成员学科交叉、优势互补，
                以综合能力提升为核心，以学科竞赛与项目实践为抓手。团队在数学建模、电子商务、物联网、创新创业、
                科普作品等方向累计斩获国家级奖项近 50 项、省级奖项 100 余项、校级奖项百余项，并取得软件著作权 15 项、
                实用新型专利 2 项、外观设计专利 3 项，发表 SCI 二区论文 4 篇、SCI 四区论文 2 篇。
              </div>
              <div className="mt-5 text-white text-[17px] md:text-[22px] font-semibold">
                在这里，你将获得
              </div>
              <div className="mt-2 text-gray-300 text-[14px] md:text-[17px] leading-[1.8]">
                <div>1. 项目实战经验，让技能不止停留在理论。</div>
                <div>2. 团队协作机会，和优秀伙伴一起成长。</div>
                <div>3. 跨学科思维碰撞，探索技术与创新的更多可能。</div>
              </div>
              <div className="mt-5 text-white text-[17px] md:text-[22px] font-semibold">
                招新方向
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["前后端开发", "嵌入式开发", "人工智能", "产品设计", "策划运营"].map((direction) => (
                  <span
                    key={direction}
                    className="px-3 py-1.5 rounded-full border border-[#6fd2ff66] bg-[#12324a80] text-[#d8f3ff] text-[13px] md:text-[15px]"
                  >
                    {direction}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-gray-400 text-[13px] md:text-[15px] leading-[1.7]">
                注：线下报名表提交时间、地点及相关面试安排将通过招新群统一通知。无论你是零基础还是有经验者，只要热爱其中任一方向，均欢迎加入。
              </div>
              <div className="flex align-middle mt-8 gap-1">
                <a
                  href="https://qm.qq.com/q/7WqqRgL2qQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button_bg flex gap-1 align-middle text-white w-fit rounded-xl text-lg px-4 py-2 bg-blue-500 font-semibold cursor-pointer"
                >
                  <div className="flex-none">点击加入迎新群</div>
                  <img src={sharearrow} alt="" className="button_arrow" />
                </a>
              </div>
            </div>
          </div>
          <div className="md:mt-24 mt-8 px-3 md:px-0">
            <div className="text-white md:text-[44px] text-[1.8rem] font-bold leading-tight">
              往期回顾
            </div>
            <div className="mt-2 h-[3px] w-20 md:w-28 rounded-full bg-gradient-to-r from-[#8ed8ff] to-[#2ca6e3] shadow-[0_0_10px_rgba(142,216,255,0.5)]" />
          </div>
          <AdvancedCarousel />
        </div>
      </div>
    </div>
  );
}

export default Envents;
