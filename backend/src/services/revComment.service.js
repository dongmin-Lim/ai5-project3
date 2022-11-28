import ReviewComment from '../models/RevComment.model';

class reviewCommentService {
  static async addReviewComment({ description, reviewId }) {
    // db에 저장
    const createdNewComment = await ReviewComment.create({
      description,
      reviewId,
    });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  static async showAllReviewComments({ _reviewId: reviewId }) {
    const _reviewId = await ReviewComment.findAll({
      where: { reviewId },
    });
    if (!_reviewId) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _reviewId;
    }
  }

  static async updateComment({ description, id }) {
    //db검색

    const descriptionId = await ReviewComment.findOne({
      where: { id: id },
    });

    // console.log('1:', descriptionId);
    // console.log('2:', id);
    // console.log('3', descriptionId.dataValues.id);
    // descriptionId가 null인거를 왜 못찾아내는지..?
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!descriptionId) {
      const errorMessage = '등록한 댓글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }

    // db에 저장
    if (descriptionId) {
      const updateComment = await ReviewComment.update(
        { description: description },
        { where: { id: id } },
      );
      console.log('4:', updateComment);
      //왜 updateComment는 [1]이 나오는걸까....???

      console.log('5', descriptionId);

      updateComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return descriptionId;
    }
  }

  static async deleteComment({ _id }) {
    const id = await ReviewComment.destroy({
      where: { id: _id },
    });
    if (!id) {
      const errorMessage = '댓글이 없습니다';
      return errorMessage;
    } else {
      const message = '댓글이 삭제되었습니다.';
      return message;
    }
  }
}

export { reviewCommentService };
