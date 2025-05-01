import CreateException from "App/Exceptions/CreateException";
import NotFoundException from "App/Exceptions/NotFoundException";
import Feedback from "App/Models/Feedback";

export default class FeedbackRepository {
  constructor() {}

  async add(data){
    return await Feedback.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('feedback', err.message)
      }
    )
  }

  async getById(uuid: string) {
    return Feedback.query()
      .where('uuid', uuid)
      .firstOrFail()
      .then((res) => {
        return res.serialize()
      }, (err) => {
        throw new NotFoundException('feedback', err.message)
      }
    )
  }
}
