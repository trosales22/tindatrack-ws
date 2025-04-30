import Database from "@ioc:Adonis/Lucid/Database";
import Business from "App/Models/Business";
import BusinessProduct from "App/Models/BusinessProduct";
import BusinessSales from "App/Models/BusinessSales";

export default class StatisticsRepository {
  constructor() {
  }

  async getStats(params: any = {}){
    const businessesTable = Business.table
    const productsTable = BusinessProduct.table
    const salesTable = BusinessSales.table

    const {
      owner_id: ownerId,
      business_id: businessId
    } = params;

    if(businessId){
      return Database.rawQuery(`
        SELECT
          (SELECT COUNT(*) FROM ${productsTable} WHERE business_id=?) AS total_products,
          (SELECT COALESCE(SUM(total_amount), 0) FROM ${salesTable} WHERE business_id=?) AS total_sales
      `, [businessId, businessId])
    }

    return Database.rawQuery(`
      SELECT
        (SELECT COUNT(*) FROM ${businessesTable} WHERE owner_id=?) AS total_businesses,
        (SELECT COUNT(*) FROM ${productsTable} WHERE owner_id=?) AS total_products,
        (SELECT COALESCE(SUM(total_amount), 0) FROM ${salesTable} WHERE owner_id=?) AS total_sales
    `, [ownerId, ownerId, ownerId])
  }
}
