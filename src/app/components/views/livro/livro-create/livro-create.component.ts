import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro-model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
  titulo = new FormControl('', [Validators.minLength(3)])
  nomeAutor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(3)])
  idCat: String = ''
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id')!
  }
  create(): void {
    this.service.create(this.idCat!, this.livro).subscribe((resposta => {
      this.router.navigate([`categorias/${this.idCat}/livros`])
      this.service.mensagem('Livro criado com sucesso!')
    }), err => {
      for(var i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }
  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres'
    }
    if(this.nomeAutor.invalid) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres'
    }
    if(this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 3 e 2000000 caracteres'
    }
    return false
  }
}
