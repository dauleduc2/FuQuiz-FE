import { ApiListRoutes } from '../../../../core/common/enum';
import { useGetListWithCount } from '../../../../core/common/hooks';
import { FilterQuestionsDTO, QuestionListDTO } from '../../containers/questionList/interface';

export const useGetAllQuestionList = (options: Partial<FilterQuestionsDTO>) => {
    const { count, list: questions } = useGetListWithCount<QuestionListDTO, Partial<FilterQuestionsDTO>>(ApiListRoutes.QUESTIONS, options);

    return { questions, count };
};
