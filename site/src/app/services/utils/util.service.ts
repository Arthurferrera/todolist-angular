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
}
