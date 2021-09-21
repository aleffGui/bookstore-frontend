import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro-model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {
  idCat: String = ''
  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }
  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta => {
      this.livro = resposta
    }))
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`])
  }
}
