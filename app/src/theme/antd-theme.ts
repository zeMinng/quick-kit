import type { ThemeConfig } from 'antd'

/**
 * Ant Design tokens aligned with `styles/themes/theme.scss` (QuickKit editorial palette).
 * Update both when changing brand colors.
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#292524',
    colorPrimaryHover: '#44403c',
    colorPrimaryActive: '#0c0a09',
    colorSuccess: '#16a34a',
    colorWarning: '#b45309',
    colorError: '#dc2626',
    colorInfo: '#57534e',
    colorLink: '#292524',
    colorLinkHover: '#0c0a09',
    colorText: '#0c0a09',
    colorTextSecondary: '#4e4e4e',
    colorTextTertiary: '#777169',
    colorTextQuaternary: '#a8a29e',
    colorBorder: '#ddd',
    colorBorderSecondary: '#ececec',
    colorSplit: '#ececec',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#fafafa',
    colorBgLayout: '#ffffff',
    colorFillAlter: '#fafafa',
    colorFillSecondary: '#f5f5f5',
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    borderRadiusXS: 4,
    fontFamily:
      'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    boxShadowSecondary: '0 4px 16px rgb(0 0 0 / 4%)',
    wireframe: false,
  },
  components: {
    Button: {
      primaryShadow: 'none',
    },
    Input: {
      activeShadow: '0 0 0 2px rgb(41 37 36 / 12%)',
    },
  },
}
