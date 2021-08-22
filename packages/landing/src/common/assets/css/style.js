import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const ResetCSS = createGlobalStyle`
  ::selection {
    background: #333333;
    color: #ffffff;
  }

  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus {
    outline: none;
  }

  html,
  html a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  dl,
  th,
  dt,
  input,
  textarea,
  span,
  div {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .reuseModalHolder {
    padding: 0 !important;
    &.demo_switcher_modal {
      border: 0 !important;
      background-color: rgba(16, 30, 77, 0.9) !important;
      .innerRndComponent {
        border-radius: 8px !important;
      }
    }
  }

  button.modalCloseBtn {
    position: fixed !important;
    z-index: 999991 !important;
    background-color: transparent !important;
    top: 10px !important;
    right: 10px !important;
    min-width: 34px !important;
    min-height: 34px !important;
    padding: 0 !important;
    span.btn-icon {
      font-size: 22px !important;
      transform: rotate(45deg) !important;
    }

    &.alt {
      border-radius: 50% !important;
      z-index: 999999 !important;
      padding: 0 !important;
      transition: all 0.3s ease !important;
      top: 25px !important;
      right: 30px !important;
      min-width: 40px !important;
      min-height: 40px !important;

      span.btn-icon {
        font-size: 20px !important;
      }

      &:hover {
        opacity: 0.88 !important;
      }
    }
  }
  
/*  ANT DESIGN */
.ant-input:focus{
  border-color: ${themeGet('colors.primaryLight')};
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px #e98d5733;
    box-shadow: 0 0 0 2px #e99e5733;
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border-color: ${themeGet('colors.primaryLight')};
      border-right-width: 1px !important;
      outline: 0;
      -webkit-box-shadow: 0 0 0 2px #e98d5733;
    box-shadow: 0 0 0 2px #e99e5733;
}
.ant-btn.ant-btn-primary{
  background: ${themeGet('colors.primary')};
  border-color: ${themeGet('colors.primary')};
}
.ant-btn:hover{
  color: initial;
  border-color: initial; 
}

.ant-btn-primary:hover{
  background: ${themeGet('colors.primaryDark')};
  border-color: ${themeGet('colors.primaryDark')}; 
  color:  ${themeGet('colors.white')};;
}
.ant-btn-primary[disabled], .ant-btn-primary[disabled]:hover, .ant-btn-primary[disabled]:focus, .ant-btn-primary[disabled]:active {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.ant-input:hover,.ant-select:not(.ant-select-disabled):hover .ant-select-selector,.ant-picker-input > input:hover,.ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before{
  border-color: ${themeGet('colors.primary')};
}

  .ant-menu-vertical.ant-menu-sub:not([class*='-active']),
  .ant-menu-vertical-left.ant-menu-sub:not([class*='-active']),
  .ant-menu-vertical-right.ant-menu-sub:not([class*='-active']) {
    border-top-right-radius:10px;
    border-bottom-right-radius:10px;
    box-shadow: 0 2px 3px rgba(200, 200, 200, 0.2);
  }
  .ant-menu-sub.ant-menu-vertical li:hover {
    color: ${themeGet('colors.primary')};
  }
  .ant-menu-submenu:hover
    > .ant-menu-submenu-title
    > .ant-menu-submenu-expand-icon,
    .ant-menu-item a:hover,
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
  .ant-menu-light .ant-menu-item:hover,
  .ant-menu-light .ant-menu-item-active,
  .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-light .ant-menu-submenu-active,
  .ant-menu-light .ant-menu-submenu-title:hover {
    color: ${themeGet('colors.primary')};
  }
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner{
    background: ${themeGet('colors.primary')}
  }
  .ant-picker-today-btn,.ant-picker-today-btn:hover,.ant-picker-header-view button:hover{
        color: ${themeGet('colors.primary')};
  }
  .ant-menu-vertical .ant-menu-item-group-list .ant-menu-submenu-title, .ant-menu-vertical .ant-menu-submenu-title{
    padding:0 16px;
    border-radius:10px;
  }
  .ant-menu-submenu-title {
    padding-right: 54px;
  }
  .ant-menu-submenu-title:active{
    background:transparent;
    box-shadow: 0 2px 3px rgba(200, 200, 200, 0.2);
  }
  .ant-menu-submenu-expand-icon{
    display: grid;
    place-items:center
    };
    .ant-modal-body .result-form{
      display:flex;
      flex-direction:column;
    }
`;
