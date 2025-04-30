import Database from "@ioc:Adonis/Lucid/Database";
import Business from "App/Models/Business";
import BusinessProduct from "App/Models/BusinessProduct";
import BusinessSales from "App/Models/BusinessSales";

export default class AnalyticsRepository {
  constructor() {
  }

  async getSalesStats(payload: any) {
    const conditions: string[] = [];
    const values: any[] = [];

    if (payload.business_id) {
      conditions.push("business_id = ?");
      values.push(payload.business_id);
    }

    if (payload.year) {
      conditions.push("YEAR(created_at) = ?");
      values.push(payload.year);
    }

    if (payload.month && payload.group_by === 'daily') {
      conditions.push("MONTH(created_at) = ?");
      values.push(payload.month);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const groupBySelect =
    payload.group_by === 'daily'
      ? "DAY(created_at) AS day, MONTH(created_at) AS month"
      : "MONTH(created_at) AS period";

    const groupByClause =
      payload.group_by === 'daily'
        ? "MONTH(created_at), DAY(created_at)"
        : "MONTH(created_at)";

    const query = `
      SELECT
        ${groupBySelect},
        COUNT(*) AS total_transactions,
        SUM(total_amount) AS total_sales,
        ROUND(AVG(total_amount), 2) AS avg_sales_per_transaction
      FROM ${BusinessSales.table}
      ${whereClause}
      GROUP BY ${groupByClause}
      ORDER BY ${groupByClause}
    `;

    try {
      const result = await Database.rawQuery(query, values);
      return result[0];
    } catch (err) {
      return { error: err.message };
    }
  }

  async getProductCountPerBusiness(params: any = {}) {
    const conditions: string[] = []
    const bindings: any[] = []

    if (params.business_id) {
      conditions.push('A.business_id = ?')
      bindings.push(params.business_id)
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
      SELECT
        B.name AS business_name,
        COUNT(A.id) AS product_count
      FROM ${BusinessProduct.table} A
      JOIN ${Business.table} B ON A.business_id = B.uuid
      ${whereClause}
      GROUP BY B.name
      ORDER BY product_count DESC
    `

    return Database.rawQuery(query, bindings)
      .then(res => res[0])
      .catch(err => err.message)
  }

  async getProductCategoryCountPerBusiness(params: any = {}) {
    const conditions: string[] = []
    const bindings: any[] = []

    if (params.business_id) {
      conditions.push('A.business_id = ?')
      bindings.push(params.business_id)
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
      SELECT
        B.name AS business_name,
        A.category AS category_code,
        COUNT(A.id) AS category_count
      FROM ${BusinessProduct.table} A
      JOIN ${Business.table} B ON A.business_id = B.uuid
      ${whereClause}
      GROUP BY B.name, A.category
      ORDER BY category_count DESC
    `

    return Database.rawQuery(query, bindings)
      .then(res => res[0])
      .catch(err => err.message)
  }
}
