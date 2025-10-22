import { Component, type OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateGlobaleService } from '../../../../../Services/date-globale.service';
import { GlobalDate } from "../../../../../models/global-date.models"

@Component({
  selector: "app-date-globale-form",
  standalone: false,
  templateUrl: "./date-globale-form.component.html",
  styleUrls: ["./date-globale-form.component.scss"],
})
export class DateGlobaleFormComponent implements OnInit {
  dateForm: FormGroup
  dateTypes: string[] = []
  dates: GlobalDate[] = []
  loading = false
  success = false
  error = ""

  constructor(
    private fb: FormBuilder,
    private dateGlobaleService: DateGlobaleService,
  ) {
    this.dateForm = this.fb.group({
      nom: ["", Validators.required],
      date: ["", Validators.required],
      description: [""],
      active: [true],
    })
  }

  ngOnInit(): void {
    this.loadDateTypes()
    this.loadDates()
  }

  loadDateTypes(): void {
    this.dateGlobaleService.getDateTypes().subscribe(
      (types) => (this.dateTypes = types),
      (error) => console.error("Erreur lors du chargement des types de dates", error),
    )
  }

  loadDates(): void {
    this.dateGlobaleService.getAllDates().subscribe(
      (dates) => (this.dates = dates),
      (error) => console.error("Erreur lors du chargement des dates", error),
    )
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      this.loading = true
      this.error = ""
      this.success = false

      const dateData: GlobalDate = this.dateForm.value

      this.dateGlobaleService.saveDate(dateData).subscribe(
        (result) => {
          this.success = true
          this.loading = false
          this.loadDates()
          this.dateForm.reset({ active: true })
        },
        (error) => {
          this.error = "Erreur lors de l'enregistrement de la date"
          this.loading = false
          console.error("Erreur", error)
        },
      )
    }
  }
}
