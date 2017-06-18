import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ANGULAR_APP_JSONAPI } from './../../../../config';
import { RecipeJSONResponse, Recipe } from './../model/recipe.model';
import { AppState } from './../../store/appState';
import { RECIPES_ACTION_TYPES } from './../../store/recipes.store';

@Injectable()
export class RecipeService {

  constructor(private http: Http, private store: Store<AppState>) { }

  /**
   * Get the list of recipes.
   */
  getRecipes(): void {
    this.http.get(`${ANGULAR_APP_JSONAPI}/api/recipes?sort=created&promote=true&limt=4`).map((data: Response) => {
      return JSON.parse(data.text());
    }).map((recipeResponse: RecipeJSONResponse) => {
      return recipeResponse.data;
    }).subscribe((response: Recipe[]) => {
      this.store.dispatch({
        type: RECIPES_ACTION_TYPES.SAVE_RECIPES,
        payload: {
          'recipes': response
        }
      });
    });
  }
}
