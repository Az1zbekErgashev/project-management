import styled from 'styled-components';

export const StyledSitebar = styled.div`
  .sidebar {
    position: fixed;
    width: 250px;
    margin: 16px;
    background: #151a2d;
    height: 100vh;
    transition: all 0.4s ease;
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
  .sidebar-nav .nav-tooltip {
    position: absolute;
    top: -10px;
    opacity: 0;
    color: #151a2d;
    display: none;
    pointer-events: none;
    padding: 6px 12px;
    border-radius: 8px;
    white-space: nowrap;
    background: #fff;
    left: calc(100% + 25px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0s;
  }
  .sidebar.collapsed .sidebar-nav .nav-tooltip {
    display: block;
  }
  .sidebar-nav .nav-item:hover .nav-tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(50%);
    transition: all 0.4s ease;
  }
  .sidebar-nav .secondary-nav {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  /* Responsive media query code for small screens */
  @media (max-width: 1024px) {
    .sidebar {
      height: 56px;
      margin: 13px;
      overflow-y: hidden;
      scrollbar-width: none;
      width: calc(100% - 26px);
      max-height: calc(100vh - 26px);
    }
    .sidebar.menu-active {
      overflow-y: auto;
    }
    .sidebar .sidebar-header {
      position: sticky;
      top: 0;
      z-index: 20;
      border-radius: 16px;
      background: #151a2d;
      padding: 8px 10px;
    }
    .sidebar-header .header-logo img {
      width: 40px;
      height: 40px;
    }
    .sidebar-header .sidebar-toggler,
    .sidebar-nav .nav-item:hover .nav-tooltip {
      display: none;
    }

    .sidebar-header .menu-toggler {
      display: flex;
      height: 30px;
      width: 30px;
    }
    .sidebar-header .menu-toggler span {
      font-size: 1.3rem;
    }
    .sidebar .sidebar-nav .nav-list {
      padding: 0 10px;
    }
    .sidebar-nav .nav-link {
      gap: 10px;
      padding: 10px;
      font-size: 0.94rem;
    }
    .sidebar-nav .nav-link .nav-icon {
      font-size: 1.37rem;
    }
    .sidebar-nav .secondary-nav {
      position: relative;
      bottom: 0;
      margin: 40px 0 30px;
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
`;
