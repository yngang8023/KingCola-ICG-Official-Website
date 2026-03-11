import React, { useEffect, useMemo, useState } from "react";
import { logopng } from "../assets";
import "./css/LoadingPage.css";

const BRAND_LETTERS = ["K", "I", "N", "G", "C", "O", "L", "A"];

const LoadingPage = ({
  compact = false,
  fullscreen = false,
  timeoutMs = 0,
  onTimeout,
  onRetry,
  onGoHome,
}) => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    setIsSlowNetwork(false);

    if (!timeoutMs || timeoutMs <= 0) return undefined;

    const timerId = window.setTimeout(() => {
      setIsSlowNetwork(true);
      if (onTimeout) onTimeout();
    }, timeoutMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [onTimeout, timeoutMs]);

  const timeoutSeconds = useMemo(() => Math.max(1, Math.round(timeoutMs / 1000)), [timeoutMs]);
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
      return;
    }
    window.location.href = "/";
  };

  let rootClassName = "kc-loader";
  if (compact) rootClassName += " kc-loader--compact";
  if (fullscreen) rootClassName += " kc-loader--overlay";

  return (
    <div
      className={rootClassName}
      role="status"
      aria-live="polite"
      aria-label="页面加载中"
    >
      <div className="kc-loader__ambient" aria-hidden="true"></div>
      <div className="kc-loader__card">
        <div className="kc-loader__spinner" aria-hidden="true">
          <span className="kc-loader__ring kc-loader__ring--outer"></span>
          <span className="kc-loader__ring kc-loader__ring--middle"></span>
          <span className="kc-loader__ring kc-loader__ring--inner"></span>
          <span className="kc-loader__core">
            <img src={logopng} alt="KingCola-ICG Logo" className="kc-loader__logo" />
          </span>
        </div>

        <div className="kc-loader__wordmark" aria-hidden="true">
          {BRAND_LETTERS.map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>

        <p className="kc-loader__text">
          {isSlowNetwork ? `网络较慢，已等待约 ${timeoutSeconds} 秒...` : "页面加载中..."}
        </p>

        {isSlowNetwork && (
          <div className="kc-loader__slow-zone" role="alert" aria-live="assertive">
            <p className="kc-loader__hint">当前网络不稳定，可重试加载或先返回首页继续浏览。</p>
            <div className="kc-loader__actions">
              <button type="button" className="kc-loader__button" onClick={handleRetry}>
                重试加载
              </button>
              <button
                type="button"
                className="kc-loader__button kc-loader__button--ghost"
                onClick={handleGoHome}
              >
                返回首页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
