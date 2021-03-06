import * as utils from '../utils';
import AuthService from '../auth/auth.service';

/*const testdata = {
    hits: [
        {
            recipe: {
                label: 'Chicken',
                yield: 3,
                totalTime: 10,
                ingredientLines: [
                    '1/2 cup of olives',
                    '2 large russet potatoes, peeled and cut into chunks',
                ],
                healthLabels: ['Vegetarian', 'Nut free'],
            },
        },
        {
            recipe: {
                label: 'Kreplach (Chicken Dumplings)',
                yield: 8,
                totalTime: 15,
                ingredientLines: [
                    '1/2 cup of olives',
                    '2 large russet potatoes, peeled and cut into chunks',
                ],
                healthLabels: [],
            },
        },
    ],
};*/

class RecipeService {
    search(keyword) {
        //return testdata;

        return utils.request
            .get(`recipes?keyword=${keyword}`, AuthService.getToken())
            .then((response) => {
                return response.data.data;
            });
    }
}

export default new RecipeService();
