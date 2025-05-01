import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JSONSerializerHelper from 'App/Helpers/JSONSerializerHelper'
import FeedbackRepository from 'App/Repositories/FeedbackRepository'
import CreateFeedbackRequest from 'App/Validators/Feedback/CreateFeedbackRequest'
import FeedbackTransformer from 'App/Transformers/FeedbackTransformer'
import Feedback from 'App/Models/Feedback'

export default class FeedbackController {
  private feedbackRepo: FeedbackRepository

  constructor() {
    this.feedbackRepo = new FeedbackRepository()
  }

  // @ts-ignore
  public async store({ auth, request, response, transform }: HttpContextContract) {
    await request.validate(CreateFeedbackRequest)

    const payload = request.only(['name', 'email', 'message'])
    const created = await this.feedbackRepo.add(payload)

    const data = await this.feedbackRepo.getById(created.uuid)
    const transformed = await transform.item(data, FeedbackTransformer)
    const serialized = JSONSerializerHelper.serialize(Feedback.table, null, transformed)

    return response.created(serialized)
  }
}
