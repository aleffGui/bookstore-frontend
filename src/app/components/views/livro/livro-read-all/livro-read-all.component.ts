import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro-model';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {
  livros: Livro[] = []
  idCat: String = ''
  showSpinner = false
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id')!
    console.log(this.idCat)
    this.showSpinner = true
    this.findAll()
  }
  findAll() : void {
    this.service.findAllByCategoria(this.idCat).subscribe((resposta => {
      this.livros = resposta
      console.log(this.livros)
    }), err => {
      console.log(err)
    })
    this.showSpinner = false
  }
  navegarParaCreateLivro() : void {
    this.router.navigate([`categorias/${this.idCat}/livros/create`])
  }
}
