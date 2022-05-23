/* eslint-disable no-undef */
describe("App tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("should find title in page", () => {
    cy.contains("Companies");
  });
  it("should render all companies", () => {
    cy.get("[data-testid=company]").should("have.length", 5);
  });
  it("should redirect to company page - 1", () => {
    cy.get("[data-testid=1]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/1");
    });
    cy.get("[data-testid=number]").should("have.length", 6);
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });
  it("should redirect to company page - 2", () => {
    cy.get("[data-testid=2]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/2");
    });
    cy.get("[data-testid=number]").should("have.length", 7);
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });
  it("should redirect to company page - 3", () => {
    cy.get("[data-testid=3]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/3");
    });
    cy.get("[data-testid=number]").should("have.length", 0);
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });

  it("should redirect to company page - 4", () => {
    cy.get("[data-testid=4]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/4");
    });
    cy.get("[data-testid=number]").should("have.length", 2);
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });

  it("should redirect to company page - 5", () => {
    cy.get("[data-testid=5]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/5");
    });
    cy.get("[data-testid=number]").should("have.length", 2);
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });

  it("should redirect to company page - 1 and to numbers page and back", () => {
    cy.get("[data-testid=1]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/1");
    });
    cy.get("[data-testid=351910000000]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/numbers/351910000000");
    });
    cy.contains("351910000000");
    cy.contains("mobile");
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/company/1");
    });
    cy.get("[data-testid=back]").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:8080/");
    });
  });
});
