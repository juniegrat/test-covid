import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const LoginModalWrapper = styled.div`
  width: 80%;
  margin: 16em auto 71px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${themeGet('colors.white', '#ffffff')};
  @media only screen and (min-width: 1201px) {
    max-width: 1170px;
    width: 100%;
  }
  @media only screen and (max-width: 667px) {
    width: 100%;
  }
  .col {
    position: relative;
    .patternImage {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media only screen and (max-width: 991px) {
      width: 100%;
      &.imageCol {
        display: none;
      }
    }
  }
  .reusecore__button {
    background-color: transparent;
    &.default {
      background-color: ${themeGet('colors.primary', '#10ac84')};
      transition: all 0.3s ease;
      &:hover {
        box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
      }
    }
  }

  .rc-tabs {
    border: 0;
    max-width: 460px;
    margin: auto;
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 20px 50px rgba(54, 91, 125, 0.05);
    @media only screen and (max-width: 991px) {
      max-width: 100%;
    }
    .rc-tabs-bar {
      margin-left: 15px;
    }
    .rc-tabs-nav-wrap {
      padding: 0;
      border-bottom: 1px solid #f3f3f3;
      .rc-tabs-tab-prev,
      .rc-tabs-tab-next {
        display: none;
      }
      .rc-tabs-nav-scroll,
      .rc-tabs-nav,
      .rc-tabs-nav-list {
        width: 100%;
        .rc-tabs-tab {
          width: 50%;
          margin-right: 0;
          padding: 13px 0;
          text-align: center;
          box-sizing: border-box;
          position: relative;
          display: block;
          transition: color 0.3s cubic-bezier(0.35, 0, 0.25, 1);
          cursor: pointer;
          float: left;
          height: 100%;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.5;
          white-space: nowrap;
          &.rc-tabs-tab-active {
            color: ${themeGet('colors.primary')};
            cursor: default;
            transform: translateZ(0);
          }
        }
        .rc-tabs-ink-bar {
          height: 2px !important;
          bottom: 0;
          left: 0;
          z-index: 1;
          position: absolute;
          box-sizing: border-box;
          margin-top: -3px;
          background: ${themeGet('colors.primary')};
          transform-origin: 0 0;
          width: 0;
          height: 0;
        }
        .rc-tabs-ink-bar-animated {
          transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1),
            left 0.3s cubic-bezier(0.35, 0, 0.25, 1),
            top 0.3s cubic-bezier(0.35, 0, 0.25, 1),
            height 0.3s cubic-bezier(0.35, 0, 0.25, 1),
            width 0.3s cubic-bezier(0.35, 0, 0.25, 1);
        }
      }
    }
    .rc-tabs-tabpane {
      padding-left: 35px;
      padding-bottom: 15px;
      padding-right: 35px;
      @media (min-width: 1200px) {
        min-height: 460px;
      }
    }
    .reusecore__input {
      margin-bottom: 30px;
      &.is-material {
        &.is-focus {
          label {
            color: ${themeGet('colors.primary', '#10ac84')};
            top: -12px;
          }
          .highlight {
            background-color: ${themeGet('colors.primary', '#10ac84')};
          }
        }
      }

      label {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        top: 15px;
      }
    }
    .reusecore__checkbox {
      margin: 0 0 35px;
      label {
        .reusecore__field-label {
          font-size: 13px;
          font-weight: 400;
        }
      }
    }
  }
`;

export default LoginModalWrapper;
