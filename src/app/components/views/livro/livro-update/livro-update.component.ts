import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro-model';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
  idCat : String = ''
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

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
  update() : void {
    this.service.update(this.livro).subscribe((resposta => {
      this.livro = resposta
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.mensagem('Livro alterado com sucesso!')
    }), err => {
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }
 
}
