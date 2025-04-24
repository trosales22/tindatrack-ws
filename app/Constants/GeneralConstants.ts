export default class GeneralConstants {
  public static PH_TIMEZONE = 'Asia/Manila'
  public static SESSION_EXPIRY = '480mins' //8hrs

  public static ENVIRONMENT_TYPES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  }

  public static ROLE_TYPES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    BUSINESS_ADMIN: 'BUSINESS_ADMIN'
  }

  public static ROLE_LABELS = {
    [this.ROLE_TYPES.SUPER_ADMIN]: 'Super Administrator',
    [this.ROLE_TYPES.BUSINESS_ADMIN]: 'Business Administrator'
  }

  public static GENERAL_STATUS_TYPES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  }

  public static GENERAL_STATUS_LABELS = {
    [this.GENERAL_STATUS_TYPES.ACTIVE]: 'Active',
    [this.GENERAL_STATUS_TYPES.INACTIVE]: 'Inactive',
  }

  public static STORE_TYPES = {
    RETAIL: 'retail',
    FOOD_STALL: 'food_stall',
    EATERY: 'eatery',
    GROCERY: 'grocery',
    KIOSK: 'kiosk',
    MARKET_VENDOR: 'market_vendor',
    OTHER: 'other'
  }

  public static STORE_TYPE_LABELS = {
    [this.STORE_TYPES.RETAIL]: 'Retail Store',
    [this.STORE_TYPES.FOOD_STALL]: 'Food Stall / Vendor',
    [this.STORE_TYPES.EATERY]: 'Eatery / Carinderia',
    [this.STORE_TYPES.GROCERY]: 'Grocery / Mini Mart',
    [this.STORE_TYPES.KIOSK]: 'Kiosk',
    [this.STORE_TYPES.MARKET_VENDOR]: 'Market Vendor',
    [this.STORE_TYPES.OTHER]: 'Other'
  }

  public static PRODUCT_CATEGORIES = {
    SNACKS: 'snacks',
    BEVERAGES: 'beverages',
    CANNED_GOODS: 'canned_goods',
    INSTANT_NOODLES: 'instant_noodles',
    RICE_AND_GRAINS: 'rice_and_grains',
    BREAD_AND_BAKERY: 'bread_and_bakery',
    FROZEN_GOODS: 'frozen_goods',
    CONDIMENTS_AND_SAUCES: 'condiments_and_sauces',
    COOKING_ESSENTIALS: 'cooking_essentials',
    PERSONAL_CARE: 'personal_care',
    CLEANING_SUPPLIES: 'cleaning_supplies',
    PET_SUPPLIES: 'pet_supplies',
    SARI_SARI_ESSENTIALS: 'sari_sari_essentials',
    E_SERVICES: 'e_services',
    STATIONERY: 'stationery',
    TOYS_ACCESSORIES: 'toys_accessories',
    HOME_KITCHEN: 'home_kitchen',
    VEGETABLES: 'vegetables',
    FRUITS: 'fruits',
    OTHERS: 'others'
  }

  public static PRODUCT_CATEGORY_LABELS = {
    [this.PRODUCT_CATEGORIES.SNACKS]: 'Snacks',
    [this.PRODUCT_CATEGORIES.BEVERAGES]: 'Beverages',
    [this.PRODUCT_CATEGORIES.CANNED_GOODS]: 'Canned Goods',
    [this.PRODUCT_CATEGORIES.INSTANT_NOODLES]: 'Instant Noodles',
    [this.PRODUCT_CATEGORIES.RICE_AND_GRAINS]: 'Rice & Grains',
    [this.PRODUCT_CATEGORIES.BREAD_AND_BAKERY]: 'Bread & Bakery',
    [this.PRODUCT_CATEGORIES.FROZEN_GOODS]: 'Frozen Goods',
    [this.PRODUCT_CATEGORIES.CONDIMENTS_AND_SAUCES]: 'Condiments & Sauces',
    [this.PRODUCT_CATEGORIES.COOKING_ESSENTIALS]: 'Cooking Essentials',
    [this.PRODUCT_CATEGORIES.PERSONAL_CARE]: 'Personal Care',
    [this.PRODUCT_CATEGORIES.CLEANING_SUPPLIES]: 'Cleaning Supplies',
    [this.PRODUCT_CATEGORIES.PET_SUPPLIES]: 'Pet Supplies',
    [this.PRODUCT_CATEGORIES.SARI_SARI_ESSENTIALS]: 'Sari-sari Store Essentials',
    [this.PRODUCT_CATEGORIES.E_SERVICES]: 'Mobile Load & E-Services',
    [this.PRODUCT_CATEGORIES.STATIONERY]: 'Stationery',
    [this.PRODUCT_CATEGORIES.TOYS_ACCESSORIES]: 'Toys & Accessories',
    [this.PRODUCT_CATEGORIES.HOME_KITCHEN]: 'Home & Kitchen Items',
    [this.PRODUCT_CATEGORIES.VEGETABLES]: 'Vegetables',
    [this.PRODUCT_CATEGORIES.FRUITS]: 'Fruits',
    [this.PRODUCT_CATEGORIES.OTHERS]: 'Others'
  }

  public static BUSINESS_INVESTMENT_TYPES = {
    CAPITAL: 'capital',
    RAW_MATERIALS: 'raw_materials'
  }

  public static BUSINESS_INVESTMENT_SOURCE_TYPES = {
    PERSONAL: 'personal',
    LOAN: 'loan',
    SUPPLIER: 'supplier'
  }

  public static MONTH_NAMES = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
}
