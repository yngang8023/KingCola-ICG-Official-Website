const resources = [
  {
    id: 1,
    name: "HTML/CSS/JavaScript",
    type: "前端方向",
    image: "https://cdn.simpleicons.org/javascript/F7DF1E",
    description:
      "Web 前端三件套基础能力，覆盖页面结构、样式布局与交互逻辑，是网页与小程序开发的核心起点。",
    link: "https://developer.mozilla.org/zh-CN/",
    video: "https://www.bilibili.com/video/BV1kM4y127Li/",
  },
  {
    id: 2,
    name: "Vue 3",
    type: "前端方向",
    image: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
    description:
      "轻量且工程化友好的前端框架，适合快速构建中大型后台系统与组件化页面。",
    link: "https://cn.vuejs.org/",
    video: "https://www.bilibili.com/video/BV1Zy4y1K7SH/",
  },
  {
    id: 3,
    name: "React",
    type: "前端方向",
    image: "https://cdn.simpleicons.org/react/61DAFB",
    description:
      "主流组件化 UI 框架，适合构建复杂交互应用，在工程生态和前端岗位中覆盖面很广。",
    link: "https://react.dev/",
    video: "https://www.bilibili.com/video/BV1wy4y1D7JT/",
  },
  {
    id: 4,
    name: "Java",
    type: "后端方向",
    image: "https://cdn.simpleicons.org/openjdk/FFFFFF",
    description:
      "企业级后端常用语言，生态完善，适合构建高并发、高稳定性的业务系统。",
    link: "https://dev.java/",
    video: "https://www.bilibili.com/video/BV1TJxCzSEEZ/",
  },
  {
    id: 5,
    name: "Python",
    type: "后端方向",
    image: "https://cdn.simpleicons.org/python/3776AB",
    description:
      "语法简洁、上手快，适合后端开发、自动化脚本与数据分析等多种开发场景。",
    link: "https://www.python.org/",
    video: "https://www.bilibili.com/video/BV1rpWjevEip/",
  },
  {
    id: 6,
    name: "Node.js",
    type: "后端方向",
    image: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    description:
      "基于 JavaScript 的服务端运行时，适合前后端统一语言栈与快速搭建接口服务。",
    link: "https://nodejs.org/en/docs",
    video: "https://www.bilibili.com/video/BV1a34y167AZ/",
  },
  {
    id: 7,
    name: "MySQL",
    type: "后端方向",
    image: "https://cdn.simpleicons.org/mysql/4479A1",
    description:
      "主流关系型数据库，适合业务数据建模、事务处理和结构化查询分析。",
    link: "https://dev.mysql.com/doc/",
    video: "https://www.bilibili.com/video/BV12b411K7Zu/",
  },
  {
    id: 8,
    name: "Docker",
    type: "后端方向",
    image: "https://cdn.simpleicons.org/docker/2496ED",
    description:
      "容器化部署核心工具，可显著提升开发环境一致性与服务交付效率。",
    link: "https://docs.docker.com/",
    video: "https://www.bilibili.com/video/BV1Ls411n7mx/",
  },
  {
    id: 9,
    name: "C/C++",
    type: "嵌入式方向",
    image: "https://cdn.simpleicons.org/cplusplus/00599C",
    description:
      "嵌入式与底层开发核心语言，适合性能敏感、硬件交互与系统级开发场景。",
    link: "https://isocpp.org/",
    video: "https://search.bilibili.com/all?keyword=c%E8%AF%AD%E8%A8%80%E6%95%99%E7%A8%8B",
  },
  {
    id: 10,
    name: "STM32 / 单片机",
    type: "嵌入式方向",
    image: "https://cdn.simpleicons.org/stmicroelectronics/FFFFFF",
    description:
      "面向硬件控制和物联网应用的主流嵌入式平台，适合做驱动、通信与实时控制项目。",
    link: "https://www.st.com/",
    video: "https://search.bilibili.com/all?keyword=STM32",
  },
  {
    id: 11,
    name: "机器学习与深度学习",
    type: "人工智能方向",
    image: "https://cdn.simpleicons.org/pytorch/EE4C2C",
    description:
      "从机器学习到深度学习的完整能力路径，覆盖建模、训练、评估与实际应用落地。",
    link: "https://pytorch.org/",
    video: "https://search.bilibili.com/all?keyword=%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E4%B8%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0",
  },
  {
    id: 12,
    name: "Figma / UIUX 设计",
    type: "产品设计方向",
    image: "https://cdn.simpleicons.org/figma/F24E1E",
    description:
      "用于界面设计与原型协作的主流工具，适合产品视觉、交互方案和设计系统建设。",
    link: "https://www.figma.com/",
    video: "https://search.bilibili.com/all?keyword=Figma",
  },
  {
    id: 13,
    name: "新媒体与内容运营",
    type: "策划运营方向",
    image: "https://cdn.simpleicons.org/youtube/FF0000",
    description:
      "围绕内容选题、账号增长、活动策划与数据复盘，构建可持续的运营增长能力。",
    link: "https://school.oceanengine.com/",
    video: "https://search.bilibili.com/all?keyword=%E6%96%B0%E5%AA%92%E4%BD%93%E4%B8%8E%E5%86%85%E5%AE%B9%E8%BF%90%E8%90%A5",
  },
];

export default resources;
