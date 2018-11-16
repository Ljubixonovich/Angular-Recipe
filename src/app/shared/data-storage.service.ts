import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorageService {
    constructor(// private http: Http,
                private recipeService: RecipeService,
                private httpClient: HttpClient) {}
        url = 'https://recipe-book-cc1f7.firebaseio.com/';
        urlDodatak = 'recipes.json';

              // httpClient !!!
    storeRecipes() { 

      //return this.httpClient.put(this.url + this.urlDodatak + queryParam + token, 
      // return this.httpClient.put(this.url + this.urlDodatak, 
      //     this.recipeService.getRecipes(), {
      //         //  observe: 'body',
      //         //  params: new HttpParams().set('auth', token)
      //         //  headers: new HttpHeaders()
      //     });
      const req = new HttpRequest('PUT', 
        this.url + this.urlDodatak, 
        this.recipeService.getRecipes(),
        {reportProgress: true});
      return this.httpClient.request(req);
    }

    getRecipes() { 

    // this.httpClient.get<Recipe[]>(this.url + this.urlDodatak + queryParam + token)
      this.httpClient.get<Recipe[]>(this.url + this.urlDodatak, {
        observe: 'body',
        responseType: 'json'
      })
        .pipe(map(
          (recipes) => {
            console.log(recipes);
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        ))
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
          }
        );
    }








        // http !!!
    // storeRecipes() {
    //     return this.http.put(this.url + this.urlDodatak, this.recipeService.getRecipes());
    // }

    // getRecipes() {
    //     this.http.get(this.url + this.urlDodatak).pipe(map(
    //         (response: Response) => {
    //             const recipes: Recipe[] = response.json();
    //             for (let recipe of recipes) {
    //                 if (!recipe['ingredients']) {
    //                     console.log(recipe);
    //                     recipe['ingredients'] = [];
    //                 }
    //             }
    //             return recipes;
    //         }
    //     )).subscribe((recipes: Recipe[]) => {
    //         this.recipeService.setRecipes(recipes);
    //     });        
    // }

}