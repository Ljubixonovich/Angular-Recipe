import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Vasina torta', 
        'info o Vasinoj torti', 
        'https://coolinarika.azureedge.net/images/_variations/b/3/b318d85d8b0d6cdc2fe91c4669b29d02_view_l.jpg?v=10',
        [new Ingredient('secer', 500), new Ingredient('orange', 1)]),
        new Recipe('Cevapi', 
        'info o cevapima', 
        'https://i2.wp.com/donesikm.com/wp-content/uploads/2017/05/cevapi-1.jpg?fit=1500%2C999&ssl=1',
        [new Ingredient('meso', 500), new Ingredient('so', 50)]),
        new Recipe('Dobos torta', 
        'info o najboljoj torti', 
        'https://www.recepti.com/img/recipe/6711-dobos-torta.jpg',
        [new Ingredient('cokolada', 800), new Ingredient('kore', 2), new Ingredient('puter', 500)])
      ];

      constructor() {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          // slice() je da bi dobio kopiju od 'private recipes' a ne pravu referencu
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      editRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}