import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KEY_MAILBOX, PASS_AUTH } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private httpClient: HttpClient, private toast: ToastrService) {}

  validatePasswordDelete(password) {
    return password === PASS_AUTH ? true : false;
  }

  async validateEmail(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get(
          `http://apilayer.net/api/check?access_key=${KEY_MAILBOX}&email=${email}`
        )
        .toPromise()
        .then((result: any) => {
          if (
            !result.success &&
            result.error.code === 104 &&
            result.error.type === 'usage_limit_reached'
          ) {
            this.toast.error(
              'Ops... API Mailbox - You have reached the limit of requests per month.'
            );
          }
          resolve(true);
        })
        .catch((error) => {
          reject(false);
          console.error(`Get validateEmail error: ${error}`);
        });
    });
  }

  async getFactsDog() {
    return new Promise<any>((resolve, reject) => {
      // this.httpClient
      //   .get(
      //     `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3`
      //   )
      //   .toPromise()
      //   .then((result: any) => {
      // console.log(result);

      // TODO: REMOVE MOCK DATA WHEN API CAT FACT IS READY
      resolve([
        {
          _id: '591f9894d369931519ce358f',
          __v: 0,
          text: 'A female cat will be pregnant for approximately 9 weeks - between 62 and 65 days from conception to delivery.',
          updatedAt: '2018-01-04T01:10:54.673Z',
          deleted: false,
          source: 'api',
          sentCount: 5,
        },
        {
          _id: '591f9854c5cbe314f7a7ad34',
          __v: 0,
          text: "It has been scientifically proven that stroking a cat can lower one's blood pressure.",
          updatedAt: '2018-01-04T01:10:54.673Z',
          deleted: false,
          source: 'api',
          sentCount: 3,
        },
      ]);
      // })
      // .catch((error) => {
      //   reject({});
      //   console.error(`Get facts dog error: ${error}`);
      // });
    });
  }
}
