import IconLifeBuoy from "~icons/lucide/life-buoy"
import IconZap from "~icons/lucide/zap"
import IconArrowRight from "~icons/lucide/arrow-right"
import IconGift from "~icons/lucide/gift"
import IconMonitor from "~icons/lucide/monitor"
import IconSun from "~icons/lucide/sun"
import IconCloud from "~icons/lucide/cloud"
import IconMoon from "~icons/lucide/moon"
import { getPlatformAlternateKey, getPlatformSpecialKey } from "./platformutils"

export default [
  {
    section: "shortcut.general.title",
    shortcuts: [
      {
        keys: ["?"],
        label: "shortcut.general.help_menu",
      },
      {
        keys: ["/"],
        label: "shortcut.general.command_menu",
      },
      {
        keys: [getPlatformSpecialKey(), "K"],
        label: "shortcut.general.show_all",
      },
      {
        keys: ["ESC"],
        label: "shortcut.general.close_current_menu",
      },
    ],
  },
]

export const spotlight = [
  {
    section: "app.spotlight",
    shortcuts: [
      {
        keys: ["?"],
        label: "shortcut.general.help_menu",
        action: "modals.support.toggle",
        icon: IconLifeBuoy,
      },
      {
        keys: [getPlatformSpecialKey(), "K"],
        label: "shortcut.general.show_all",
        action: "flyouts.keybinds.toggle",
        icon: IconZap,
      },
    ],
  },
]

export const fuse = [
  {
    keys: ["?"],
    label: "shortcut.general.help_menu",
    action: "modals.support.toggle",
    icon: IconLifeBuoy,
    tags: [
      "help",
      "support",
      "menu",
      "discord",
      "twitter",
      "documentation",
      "troubleshooting",
      "chat",
      "community",
      "feedback",
      "report",
      "bug",
      "issue",
      "ticket",
    ],
  },
  {
    keys: [getPlatformSpecialKey(), "K"],
    label: "shortcut.general.show_all",
    action: "flyouts.keybinds.toggle",
    icon: IconZap,
    tags: ["keyboard", "shortcuts"],
  },
  {
    keys: [getPlatformAlternateKey(), "T"],
    label: "shortcut.navigation.test",
    action: "navigation.jump.test",
    icon: IconArrowRight,
    tags: ["rest", "jump", "page", "navigation", "go"],
  },
  {
    keys: [getPlatformAlternateKey(), "S"],
    label: "shortcut.navigation.settings",
    action: "navigation.jump.settings",
    icon: IconArrowRight,
    tags: ["settings", "jump", "page", "navigation", "account", "theme", "go"],
  },
  {
    keys: [getPlatformAlternateKey(), "M"],
    label: "shortcut.navigation.profile",
    action: "navigation.jump.profile",
    icon: IconArrowRight,
    tags: ["profile", "jump", "page", "navigation", "account", "theme", "go"],
  },
  {
    keys: [getPlatformSpecialKey(), "M"],
    label: "shortcut.miscellaneous.invite",
    action: "modals.share.toggle",
    icon: IconGift,
    tags: ["invite", "share", "app", "friends", "people", "social"],
  },
  {
    keys: [getPlatformAlternateKey(), "0"],
    label: "shortcut.theme.system",
    action: "settings.theme.system",
    icon: IconMonitor,
    tags: ["theme", "system"],
  },
  {
    keys: [getPlatformAlternateKey(), "1"],
    label: "shortcut.theme.light",
    action: "settings.theme.light",
    icon: IconSun,
    tags: ["theme", "light"],
  },
  {
    keys: [getPlatformAlternateKey(), "2"],
    label: "shortcut.theme.dark",
    action: "settings.theme.dark",
    icon: IconCloud,
    tags: ["theme", "dark"],
  },
  {
    keys: [getPlatformAlternateKey(), "3"],
    label: "shortcut.theme.black",
    action: "settings.theme.black",
    icon: IconMoon,
    tags: ["theme", "black"],
  },
]
