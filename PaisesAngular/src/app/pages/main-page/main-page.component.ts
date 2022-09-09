import { Component} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Name, Pais } from 'src/app/interfaces/Pais';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent  {

  paises: Pais[] | undefined;
  filtername: Pais[] | undefined;
  public  page!:number;
  constructor(public http: HttpClient) { 
    this.getData();
  }
  async getData(){
    await this.http.get<any>(environment.apiUrl + "/response")
      .subscribe((res) => {
        this.paises = res.map(({name,capital,population}: Pais) =>{
          return {
            name: name,
            capital: capital,
            population:population
          }
        });
    });
   }
   
   filter(e: any){
    const search: string = e.Target.value;
    this.paises = this.filtername?.filter(({ name }: Pais) =>{
      return name.common.toLowerCase().includes(search.toLowerCase());
    });
   }

}
