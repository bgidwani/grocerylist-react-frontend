import * as utils from '../utils';
import axios from 'axios';

const testdata = {
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
};

class ReceipeService {
    search(keyword) {
        return testdata;

        /*return axios.get(searchUrl)
            .then(res => {
                //console.log(res.data);
                return res.data;
            });*/
    }
}

export default new ReceipeService();
