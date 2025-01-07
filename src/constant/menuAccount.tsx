import { RoleEnum } from "@/common/general"
import config from "@/config"
import { 
  Boxes, 
  ChevronRight, 
  GalleryVertical, 
  List, 
  ReceiptText, 
  Store, 
  Telescope, 
  Truck, 
  UserPen, 
  Users 
} from "lucide-react"
import { useTranslations } from "next-intl"

export const Options = () => {
  return (
    <div className="transition-all transform rotate-0">
      <ChevronRight className="w-4 h-4"/>
    </div>
  )
}

export const OptionsActive = () => {
  return (
    <div className="transition-all transform rotate-90">
      <ChevronRight className="w-4 h-4"/>
    </div>
  )
}

export const menuAccount = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Account');
  return [
    {
      role: RoleEnum.Default,
      option: undefined,
      optionActive: undefined,
      icon: <UserPen className='w-4 h-4'/>,
      title: <span className="text-sm">{t('profile.title')}</span>,
      href: config.routes.private.profile,
      items: [],
    },
    {
      role: RoleEnum.Default,
      option: undefined,
      optionActive: undefined,
      icon: <ReceiptText className='w-4 h-4'/>,
      title: <span className="text-sm">{t('bills.title')}</span>,
      href: "a",
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <Users className='w-4 h-4'/>,
      title: <span className="text-sm">{t('users.title')}</span>,
      href: config.routes.private.users,
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <List className='w-4 h-4'/>,
      title: <span className="text-sm">{t('categories.title')}</span>,
      href: config.routes.private.categories,
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <GalleryVertical className='w-4 h-4'/>,
      title: <span className="text-sm">{t('banners.title')}</span>,
      href: config.routes.private.banners,
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <Telescope className='w-4 h-4'/>,
      title: <span className="text-sm">{t('campaign.title')}</span>,
      href: "a",
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <Boxes className='w-4 h-4'/>,
      title: <span className="text-sm">{t('products.title')}</span>,
      href: "a",
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <Truck className='w-4 h-4'/>,
      title: <span className="text-sm">{t('shipping.title')}</span>,
      href: "a",
      items: [],
    },
    {
      role: RoleEnum.Admin,
      option: undefined,
      optionActive: undefined,
      icon: <Store className='w-4 h-4'/>,
      title: <span className="text-sm">{t('stores.title')}</span>,
      href: "a",
      items: [],
    }
  ]
}