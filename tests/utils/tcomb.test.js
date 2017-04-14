/* eslint-env jest */

import { refinements } from './tcomb'

describe('Tcomb refinement', () => {
  describe('False', () => {
    it('should pass `false`', () => {
      expect(() => refinements.False(false)).not.toThrow()
    })
    it('should error on everything except `false`', () => {
      expect(() => refinements.False(true)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False('string')).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(-1)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(1)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(0)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(null)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(undefined)).toThrowErrorMatchingSnapshot()
    })
  })
})
