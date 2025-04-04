import styled from 'styled-components';

export const StyledSitebar = styled.div`
  .sidebar {
    position: fixed;
    width: 250px;
    margin: 16px;
    background: #151a2d;
    height: 100vh;
    transition: all 0.4s ease;
    overflow-y: scroll;
  }
  .sidebar.collapsed {
    width: 85px;
  }
  .sidebar .sidebar-header {
    display: flex;
    position: relative;
    padding: 25px 20px;
    align-items: center;
    justify-content: space-between;

    .title {
      color: var(--white);
      font-size: 1.333333333rem;
      font-weight: 700;
    }
  }
  .sidebar-header .toggler {
    height: 35px;
    width: 35px;
    color: #151a2d;
    border: none;
    cursor: pointer;
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: 0.4s ease;
  }
  .sidebar-header .sidebar-toggler {
    position: absolute;
    right: 20px;
  }
  .sidebar-header .menu-toggler {
    display: none;
  }
  .sidebar.collapsed .sidebar-header .toggler {
    transform: translate(-4px, 65px);
  }
  .sidebar-header .toggler:hover {
    background: #dde4fb;
  }
  .sidebar-header .toggler span {
    font-size: 1.75rem;
    transition: 0.4s ease;
  }
  .sidebar.collapsed .sidebar-header .toggler span {
    transform: rotate(180deg);
  }
  .sidebar-nav .nav-list {
    list-style: none;
    display: flex;
    gap: 4px;
    padding: 0 15px;
    flex-direction: column;
    transform: translateY(15px);
    transition: 0.4s ease;
  }
  .sidebar.collapsed .sidebar-nav .primary-nav {
    transform: translateY(65px);
  }
  .sidebar-nav .nav-link {
    width: 100%;
    color: #fff;
    display: flex;
    gap: 12px;
    white-space: nowrap;
    border-radius: 8px;
    padding: 12px 15px;
    align-items: center;
    text-decoration: none;
    transition: 0.4s ease;

    .nav-label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .sidebar.collapsed .sidebar-nav .nav-link {
    border-radius: 12px;
  }
  .sidebar .sidebar-nav .nav-link .nav-label {
    transition: opacity 0.3s ease;
  }
  .sidebar.collapsed .sidebar-nav .nav-link .nav-label {
    opacity: 0;
    pointer-events: none;
  }
  .sidebar-nav .nav-link:hover {
    color: #151a2d;
    background: #fff;

    .nav-icon-dashboard {
      path {
        stroke: #151a2d;
      }
    }
  }
  .sidebar-nav .nav-item {
    position: relative;
  }

  .sidebar-nav .secondary-nav {
    margin-top: 110px !important;
    width: 100%;
  }

  .nav-list {
    .active {
      .nav-link {
        color: #151a2d;
        background: #fff;

        .nav-icon-dashboard {
          path {
            stroke: #151a2d;
          }
        }
      }
    }
  }

  .nav-icon {
    width: 24px !important;
    height: 24px !important;
  }

  .nav-icon-dashboard {
    path {
      stroke: var(--white);
    }
  }

  .material-symbols-rounded {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .profile-link {
    padding: 12px 13px 12px 12px !important;
  }
  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
  }
  .language-list {
    display: flex;
    align-items: center;
    gap: 12px;

    .nav-label {
      div {
        display: flex;
      }
    }
  }

  .submenu {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    padding: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    max-height: 0;
    overflow: hidden;
    overflow-y: scroll;
    transition:
      max-height 0.3s ease-out,
      opacity 0.3s ease-out;
    opacity: 0;
    a {
      padding-left: 30px;

      &.active {
        .nav-sub-item {
          background: var(--white);
          color: var(--black);
        }
      }
    }
  }
  .nav-sub-item {
    padding: 5px 0;
    cursor: pointer;
    color: var(--white);

    padding: 12px;
    transition: 0.4s;
    border-radius: 8px;

    &:hover {
      background: var(--white);
      color: var(--black);
    }
  }

  .submenu.open {
    max-height: 200px;
    opacity: 1;
  }
`;
