import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro-model';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  idCat: String = ''
  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }
  findById() : void {
    this.service.findById(this.livro.id!).subscribe((resposta => {
      this.livro = resposta
    }))
  }
  delete() : void {
    this.service.delete(this.livro.id!).subscribe((resposta => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.mensagem('Livro deletado com sucesso!')
    }), err => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.mensagem(err.error.errors)
    })
  }
  cancel() : void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }
}
